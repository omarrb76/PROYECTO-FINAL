import { FirebaseService } from './../../services/firebase.service';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { User } from './../../models/user';
import { Observable } from 'rxjs';
import { SnackbarService } from './../../services/snackbar.service';
import { FormBuilder, Validators } from '@angular/forms';
import { TexttospeechService } from './../../services/texttospeech.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css']
})
export class NewpostComponent implements OnInit {

  // Si el usuario subio una foto se muestra en el form
  showImage: boolean;
  imagenURL: any;
  newPostForm;
  imagenArchivo: any;
  selectedFile: File = null;
  downloadURL: Observable<string>;
  loading = true;
  user: User;

  constructor(
    private router: Router, public tts: TexttospeechService,
    private formBuilder: FormBuilder,
    private snackBarService: SnackbarService,
    private storage: AngularFireStorage,
    private firebase: FirebaseService) {
    this.showImage = false;
    this.newPostForm = this.formBuilder.group({
      texto: ['', Validators.required],
      imagen: ['']
    });
  }

  ngOnInit(): void {
    this.firebase.getUsuarioConectado().subscribe((user: firebase.User) => {
      if (!user) {
        this.regresarLOGIN();
      } else {
        this.firebase.getUserDB(user.displayName).subscribe((data: any) => {
          if (data) {
            this.firebase.setUser(data[0]);
            this.user = this.firebase.getUser();
            this.loading = false;
          }
        });
      }
    });
  }

  regresarLOGIN() {
    this.router.navigate(['home']);
  }

  changePostPicture() {

  }

  validateAndUpload(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.imagenURL = event.target.result;
        this.showImage = true;
      };

      // console.log(event.target.files[0]);

      this.imagenArchivo = event.target.files[0];
    }
  }

  submitNewPostForm() {
    if (this.newPostForm.valid) {
      // console.log(this.newPostForm.value);
      this.loading = true;

      // Creamos el nuevo post
      const post: Post = {
        username: this.user.username,
        date: new Date(),
        text: this.newPostForm.value.texto,
        image: '',
        likes: []
      };

      // Si el usuario puso una imagen
      if (this.newPostForm.value.imagen !== '') {

        const d = Date.now();
        const file = this.imagenArchivo;
        const filePath = `${this.user.username}/posts/${d}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(`${this.user.username}/posts/${d}`, file);
        task
          .snapshotChanges()
          .pipe(
            finalize(() => {
              this.downloadURL = fileRef.getDownloadURL();
              this.downloadURL.subscribe(url => {
                if (url) {
                  post.image = url;
                }
                this.publicarPost(post);
              });
            })
          ).subscribe(url => {});
      } else { // Si no puso ninguna imagen
        this.publicarPost(post);
      }
    } else {
      this.snackBarService.openSnackBar('El texto de la publicación es requerida', 'Aceptar');
      this.tts.play('El texto de la publicación es requerida');
    }
  }

  publicarPost(post: Post){
    this.firebase.crearNuevoPost(post).then((exito: any) => {
      this.loading = false;
      this.snackBarService.openSnackBar('Post guardado con éxito', 'Aceptar');
      this.tts.play('Publicación guardada con éxito');
      this.newPostForm.reset();
      this.showImage = false;
    }).catch((err: any) => {
      this.loading = false;
      const errorCode = err.code;
      const errorMessage = err.message;
      // console.error(errorCode, errorMessage);
      this.snackBarService.openSnackBar('Error al grabar en la base de datos', 'Aceptar');
      this.tts.play('Error al grabar en la base de datos');
      this.newPostForm.reset();
      this.showImage = false;
    });
  }

}
