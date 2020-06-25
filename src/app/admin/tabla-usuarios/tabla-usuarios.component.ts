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
      sexo: ['hombre', Validators.required]
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
    console.log(user);
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
      setTimeout(() => {
        this.cargando = false;
        this.newUser = false;
      }, 5000);
      this.signupForm.reset();
    } else {
      this.snackBarService.openSnackBar('Error llenando los datos del formulario', 'Aceptar');
      this.tts.play('Error llenando los datos del formulario');
    }
  }

  estadoINICIO(){
    this.newUser = false;
  }

  goToProfile(username: string) {
    this.router.navigate([`user/${username}`]);
  }

}
