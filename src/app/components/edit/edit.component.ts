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

  constructor(
    public tts: TexttospeechService,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBarService: SnackbarService) {
    this.imagenURL = 'https://andro4all.com/files/2019/10/RDR-2-en-Stadia-700x500.jpg';
    this.editInfoForm = formBuilder.group({
      imagen: [''],
      name: ['default', Validators.required],
      password: ['default', [Validators.required, Validators.minLength(4)]],
      password2: ['default', [Validators.required, Validators.minLength(4)]]
    }, { validator: this.checkIfMatchingPasswords('password', 'password2') });
  }

  ngOnInit(): void {
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
      const password1 = group.controls[passwordKey]
      const password2 = group.controls[passwordConfirmationKey];
      if (password1.value !== password2.value) {
        return password2.setErrors({ notEquivalent: true })
      }
      else {
        return password2.setErrors(null);
      }
    };
  }

  submitEditInfoForm() {
    if (this.editInfoForm.valid) {
      console.log(this.editInfoForm.value);

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
      } else {
        this.snackBarService.openSnackBar('Coloque un nombre válido', 'Aceptar');
        this.tts.play('Coloque un nombre válido');
      }
    }
  }

}
