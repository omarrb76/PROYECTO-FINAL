import { FirebaseService } from './../../services/firebase.service';
import { User } from './../../models/user';
import { Router } from '@angular/router';
import { SnackbarService } from './../../services/snackbar.service';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { TexttospeechService } from './../../services/texttospeech.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.css']
})
export class TablaUsuariosComponent implements OnInit {

  users: User[];
  signupForm;
  newUser: boolean;
  cargando: boolean;

  constructor(
    public tts: TexttospeechService,
    private formBuilder: FormBuilder,
    private snackBarService: SnackbarService,
    private router: Router,
    private firebase: FirebaseService
  ) {
    this.signupForm = formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.compose([Validators.required, this.nameValidator])],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      sexo: ['hombre', Validators.required],
      admin: ['false', Validators.required]
    });

    this.newUser = false;
    this.cargando = false;

    this.firebase.cargarUsuarios().subscribe((data: User[]) => {
      this.users = data;
      console.log('Res: ', data);
    });

  }

  ngOnInit(): void {
  }

  borrarUsuario(user) {
    this.firebase.borrarUsuario(user);
  }

  // Funcion que valida que el username no este en la base de datos
  nameValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value === 'miguel') {
      console.log('Nombre invalido');
      return { res: true };
    }
    return null;
  }

  nuevoUsuario() {
    this.newUser = !this.newUser;
  }

  submitSignup() {
    if (this.signupForm.valid) {
      this.tts.play('Creando nuevo usuario');
      this.cargando = true;

      const user: User = {
        id: '0',
        email: this.signupForm.value.email,
        username: this.signupForm.value.username,
        name: this.signupForm.value.name,
        picture: '0',
        admin: this.signupForm.value.admin,
        sexo: this.signupForm.value.sexo,
        date: new Date()
      };

      const res = this.firebase.crearNuevoUsuarioAdmin(user, this.signupForm.value.password);
      res.then((usrCred: firebase.auth.UserCredential) => {
        usrCred.user.updateProfile({ displayName: user.username });
        user.id = usrCred.user.uid;
        this.firebase.agregarUsuario(user, this.signupForm.value.password);
        this.signupForm.reset();
        this.cargando = false;
        this.newUser = false;
      })
        .catch((err: any) => {
          const errorCode = err.code;
          const errorMessage = err.message;

          if (errorCode === 'auth/email-already-in-use') {
            this.snackBarService.openSnackBar('Este correo ya esta en uso', 'Aceptar');
            this.tts.play('Este correo electrónico ya esta en uso');
          }

          // console.error(errorCode, errorMessage);
          this.cargando = false;
        });
    } else {
      this.snackBarService.openSnackBar('Error llenando los datos del formulario', 'Aceptar');
      this.tts.play('Error llenando los datos del formulario');
    }
  }

  estadoINICIO() {
    this.newUser = false;
  }

  goToProfile(username: string) {
    this.router.navigate([`user/${username}`]);
  }

}
