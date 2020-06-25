import { User } from './../../models/user';
import { FirebaseService } from './../../services/firebase.service';
import { SnackbarService } from './../../services/snackbar.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TexttospeechService } from './../../services/texttospeech.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  imagenURL: any;
  editInfoForm;
  imagenArchivo: any;
  user: User;
  loading = true;

  constructor(
    public tts: TexttospeechService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBarService: SnackbarService,
    private firebase: FirebaseService
  ) {
    this.editInfoForm = formBuilder.group({
      imagen: [''],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
      password_anterior: ['', [Validators.required, Validators.minLength(6)]]
    }, { validator: this.checkIfMatchingPasswords('password', 'password2') });
  }

  ngOnInit(): void {
    this.firebase.getUsuarioConectado().subscribe((user: firebase.User) => {
      if (!user) {
        this.regresarLOGIN();
      } else {
        this.firebase.getPersonalInfo(user.email).subscribe((data: any) => {
          if (data) {
            this.firebase.setUser(data[0]);
            this.user = this.firebase.getUser();
            this.loading = false;
            this.user.picture = 'https://img.redbull.com/images/c_crop,x_0,y_0,h_2160,w_3240/c_fill,w_1500,h_1000/q_auto,f_auto/redbullcom/2019/02/08/89cd6b51-bf77-485e-bfd5-158940cbc1f2/apex-legends-bloodhound';
            this.imagenURL = this.user.picture;
            this.editInfoForm.controls.name.setValue(this.user.name);
          }
        });
      }
    });
  }

  regresarLOGIN() {
    this.router.navigate(['home']);
  }

  changeProfilePhoto() {
    console.log('ChangeProfilePhoto');
  }

  validateAndUpload(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.imagenURL = event.target.result;
      };

      console.log(event.target.files[0]);

      this.imagenArchivo = event.target.files[0];
    }
  }

  regresarCONFIG() {
    this.router.navigate(['settings']);
  }

  // Para ver que ambas contraseñas en el signup sean iguales
  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const password1 = group.controls[passwordKey];
      const password2 = group.controls[passwordConfirmationKey];
      if (password1.value !== password2.value) {
        return password2.setErrors({ notEquivalent: true });
      }
      else {
        return password2.setErrors(null);
      }
    };
  }

  submitEditInfoForm() {
    if (this.editInfoForm.valid) {

      this.user.name = this.editInfoForm.value.name;
      this.loading = true;

      this.firebase.updateUser(this.user, this.editInfoForm.value.password, this.editInfoForm.value.password_anterior)
        .then((exito: any) => {
          this.loading = false;
          if (exito) {
            this.snackBarService.openSnackBar('Se modificó correctamente el usuario', 'Aceptar');
            this.tts.play('Se modificó correctamente el usuario');
            this.editInfoForm.reset();
          }
        })
        .catch((err: any) => {
          console.log(err);
        });

      if (this.editInfoForm.value.imagen !== '') {
        // El usuario selecciono una imagen
        console.log(this.imagenArchivo);
      } else {
        // El usuario no selecciono imagen
      }


    } else {
      if (this.editInfoForm.value.password !== this.editInfoForm.value.password2) {
        this.snackBarService.openSnackBar('Las contraseñas no coinciden', 'Aceptar');
        this.tts.play('Las contraseñas no coinciden');
      } else if (this.editInfoForm.value.password === '') {
        this.snackBarService.openSnackBar('Coloque una contraseña válida', 'Aceptar');
        this.tts.play('Coloque una contraseña válida');
      } else {
        this.snackBarService.openSnackBar('Coloque un nombre válido', 'Aceptar');
        this.tts.play('Coloque un nombre válido');
      }
    }
  }

}
