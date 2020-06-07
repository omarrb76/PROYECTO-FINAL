import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

enum State {
  INICIO,
  LOGIN,
  SIGNUP
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

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

    this.signupForm = formBuilder.group({
      username: ['', Validators.compose([Validators.required, this.nameValidator])],
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

  // Para hacer el submit del iniciar sesion
  submitLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value); // El formulario funciona
    } else {
      this.openSnackBar('Error llenando los datos del formulario', 'Aceptar');
    }
  }

  // Para hacer el submit de crear usuario
  submitSignup() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
    } else {
      if (this.signupForm.value.password !== this.signupForm.value.password2) {
        this.openSnackBar('Las contraseñas no coinciden', 'Aceptar');
      } else {
        this.openSnackBar('Error llenando los datos del formulario', 'Aceptar');
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

  // No se porque funciona esto, ni como funciona pero no lo borren
  ageLimitValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value === 'miguel') {
        console.log('Nombre invalido');
        return { res: true };
      }
      return null;
    };
  }

  // Para mostrar un aviso de cual fue el error en el llenado de formulario
  openSnackBar(params: string, action: string) {
    const snackBarRef = this.snackBar.open(params, action, { duration: 5000 });

    snackBarRef.afterDismissed().subscribe(() => {
      console.log('The snackbar was dismissed');
    });

    snackBarRef.onAction().subscribe(() => {
      console.log('The snackbar action was triggered');
    });
  }

}
