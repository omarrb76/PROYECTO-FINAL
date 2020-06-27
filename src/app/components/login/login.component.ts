import { User } from './../../models/user';
import { FirebaseService } from './../../services/firebase.service';
import { Router } from '@angular/router';
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
  active = false;

  // Sesion iniciada, para saber si ya inicio sesion, luego lo cambiaremos por el servicio de firebase para saber
  // esto
  sesionIniciada = true;

  constructor(
    private formBuilder: FormBuilder,
    private snackBarService: SnackbarService,
    public tts: TexttospeechService,
    private router: Router,
    private firebase: FirebaseService) {

    this.firebase.getUsuarioConectado().subscribe((user: firebase.User) => {
      if (user) {
        this.active = true;
        this.router.navigate(['feed']);
      } else {
        this.active = false;
      }
    });

    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.signupForm = formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
      sexo: ['hombre', Validators.required]
    }, { validator: this.checkIfMatchingPasswords('password', 'password2') });
  }

  ngOnInit(): void { }

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

      this.firebase.emailPasswdLogin(this.loginForm.value.email, this.loginForm.value.password)
        .then((usr: any) => {
          console.log(usr);
        })
        .catch((err: any) => {
          const errorCode = err.code;
          const errorMessage = err.message;
          // alert(errorMessage);

          this.snackBarService.openSnackBar('El correo o contraseña son incorrectos', 'Aceptar');
          this.tts.play('El correo o contraseña son incorrectos');
          this.estado = State.LOGIN;

          // console.error(errorCode, errorMessage);
        });

    } else {
      this.snackBarService.openSnackBar('Error llenando los datos del formulario', 'Aceptar');
      this.tts.play('Error llenando los datos del formulario');
    }
  }

  // Para hacer el submit de crear usuario
  async submitSignup() {
    if (this.signupForm.valid) {

      this.estado = State.CARGANDO;

      this.firebase.getUserDB(this.signupForm.value.username).subscribe((data: any) => {
        // Si el username no esta tomado
        console.log(data);
        if (data.length === 0) {
          console.log('entre');
          this.tts.play('Creando nuevo usuario');

          const user: User = {
            id: '0',
            email: this.signupForm.value.email,
            username: this.signupForm.value.username.toLowerCase(),
            name: this.signupForm.value.name,
            picture: 'https://firebasestorage.googleapis.com/v0/b/' +
              'proy-isc-6a-2020.appspot.com/o/default-picture?alt=media&token=4a6e57df-4051-497b-987e-44f5a85ea1a9',
            admin: false,
            sexo: this.signupForm.value.sexo,
            date: new Date()
          };

          const res = this.firebase.crearNuevoUsuario(user, this.signupForm.value.password);
          res.then((usrCred: firebase.auth.UserCredential) => {
            // console.log(usrCred);
            usrCred.user.updateProfile({ displayName: user.username });
            user.id = usrCred.user.uid;
            this.firebase.setUser(user);
            this.firebase.agregarUsuario(user);
          })
            .catch((err: any) => {
              const errorCode = err.code;
              const errorMessage = err.message;

              if (errorCode === 'auth/email-already-in-use') {
                this.snackBarService.openSnackBar('Este correo ya esta en uso', 'Aceptar');
                this.tts.play('Este correo electrónico ya esta en uso');
              }

              // console.error(errorCode, errorMessage);
              this.estado = State.SIGNUP;
            });
        } else {
          this.snackBarService.openSnackBar('Este nombre de usuario ya esta en uso', 'Aceptar');
          this.tts.play('Este nombre de usuario ya esta en uso');

          this.estado = State.SIGNUP;
        }
      });

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

}
