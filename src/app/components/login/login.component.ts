import { TexttospeechService } from './../../services/texttospeech.service';
import { SnackbarService } from './../../services/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

enum State {
  INICIO, // Se muestran los dos botones para iniciar y crear sesion
  LOGIN, // Form de Login
  SIGNUP, // Form de signup
  CARGANDO // Se muestra el progress Spinner
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Saber que se esta presentando en pantalla
  estado = State.INICIO;

  // Formulario de inicio de sesion
  loginForm;

  // Formulario de creacion de cuenta
  signupForm;

  // Para saber si el usuario esta logeado, me sirve para cambiar la clase del login y que no se vea amontonado
  active = true;

  constructor(private formBuilder: FormBuilder, private snackBarService: SnackbarService, public tts: TexttospeechService) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

    this.signupForm = formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.compose([Validators.required, this.nameValidator])],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      sexo: ['hombre', Validators.required]
    }, { validator: this.checkIfMatchingPasswords('password', 'password2') });
  }

  ngOnInit(): void {
  }

  // Para devolverlo a su valor original
  estadoINICIO() {
    this.estado = State.INICIO;
  }

  // Para cambiar a la pantallita de iniciar sesion
  estadoLOGIN() {
    this.estado = State.LOGIN;
  }

  // Para cambiar a la pantallita de crear una nueva cuenta
  estadoSIGNUP() {
    this.estado = State.SIGNUP;
  }

  // Para mostrar el progress spinner
  estadoCARGANDO() {
    this.estado = State.CARGANDO;
  }

  // Para hacer el submit del iniciar sesion
  submitLogin() {
    if (this.loginForm.valid) {
      this.tts.play('Iniciando sesión');
      this.estado = State.CARGANDO;
      setTimeout(() => {
        this.estado = State.INICIO;
      }, 5000);
      console.log(this.loginForm.value); // El formulario funciona
    } else {
      this.snackBarService.openSnackBar('Error llenando los datos del formulario', 'Aceptar');
      this.tts.play('Error llenando los datos del formulario');
    }
  }

  // Para hacer el submit de crear usuario
  submitSignup() {
    if (this.signupForm.valid) {
      this.tts.play('Creando nuevo usuario');
      this.estado = State.CARGANDO;
      setTimeout(() => {
        this.estado = State.INICIO;
      }, 5000);
      console.log(this.signupForm.value);
    } else {
      if (this.signupForm.value.password !== this.signupForm.value.password2) {
        this.snackBarService.openSnackBar('Las contraseñas no coinciden', 'Aceptar');
        this.tts.play('Las contraseñas no coinciden');
      } else {
        this.snackBarService.openSnackBar('Error llenando los datos del formulario', 'Aceptar');
        this.tts.play('Error llenando los datos del formulario');
      }
    }
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

  // Funcion que valida que el username no este en la base de datos
  nameValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value === 'miguel') {
      console.log('Nombre invalido');
      return { res: true };
    }
    return null;
  }

}
