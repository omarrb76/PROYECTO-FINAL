import { FirebaseService } from './../../services/firebase.service';
import { User } from './../../models/user';
import { Router } from '@angular/router';
import { SnackbarService } from './../../services/snackbar.service';
import { TexttospeechService } from './../../services/texttospeech.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabla-usuarios',
  templateUrl: './tabla-usuarios.component.html',
  styleUrls: ['./tabla-usuarios.component.css']
})
export class TablaUsuariosComponent implements OnInit {

  users: User[];
  cargando: boolean;

  constructor(
    public tts: TexttospeechService,
    private snackBarService: SnackbarService,
    private router: Router,
    private firebase: FirebaseService
  ) {
    this.cargando = true;

    this.firebase.cargarUsuarios().subscribe((data: User[]) => {
      this.users = data;
      this.cargando = false;
    });

  }

  ngOnInit(): void {
    this.firebase.getUsuarioConectado().subscribe((user: firebase.User) => {
      // console.log('Usuario: ', user);
      if (user) {
        this.firebase.getUserDB(user.displayName).subscribe((data: any) => {
          if (data && data[0].admin === true) {
          } else {
            this.router.navigate(['home']);
          }
        });
      } else {
        this.router.navigate(['home']);
      }
    });
  }

  goToProfile(username: string) {
    this.router.navigate([`user/${username}`]);
  }

}
