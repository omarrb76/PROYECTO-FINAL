import { SnackbarService } from './../../services/snackbar.service';
import { FormBuilder, Validators } from '@angular/forms';
import { TexttospeechService } from './../../services/texttospeech.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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

  constructor(
    private router: Router, public tts: TexttospeechService,
    private formBuilder: FormBuilder,
    private snackBarService: SnackbarService) {
    this.showImage = false;
    this.newPostForm = this.formBuilder.group({
      texto: ['', Validators.required],
      imagen: ['']
    });
  }

  ngOnInit(): void {
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

      console.log(event.target.files[0]);

      this.imagenArchivo = event.target.files[0];
    }
  }

  submitNewPostForm() {
    if (this.newPostForm.valid) {
      console.log(this.newPostForm.value);

      if (this.imagenURL !== ''){
        // CODIGO PARA CUANDO SE ENVIA UNA IMAGEN
      } else {
        // CODIGO PARA CUANDO NO SE ENVIA CON IMAGEN
      }

    } else {
      this.snackBarService.openSnackBar('El texto de la publicación es requerida', 'Aceptar');
      this.tts.play('El texto de la publicación es requerida');
    }
  }

}
