import { User } from './../../models/user';
import { FirebaseService } from './../../services/firebase.service';
import { TexttospeechService } from './../../services/texttospeech.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  loadingUser: boolean;
  username: string;
  siguiendo: boolean;
  user: User;
  myUser: User;
  noExiste = false;
  botonSeguirEnabled: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    public tts: TexttospeechService,
    private firebase: FirebaseService,
    private router: Router
  ) {
    this.loadingUser = true;
    this.siguiendo = true;
  }

  ngOnInit(): void {

    this.firebase.getUsuarioConectado().subscribe((user: firebase.User) => {
      if (!user) {
        this.router.navigate(['home']);
      } else {
        this.firebase.getUserDB(user.displayName).subscribe((data: User[]) => {
          if (data.length > 0) {
            this.myUser = data[0];
            this.activatedRoute.params.subscribe(
              (params: any) => {
                this.username = params.username;
                this.firebase.getUserDB(this.username).subscribe((info: User[]) => {
                  this.loadingUser = false;
                  if (info.length > 0) {
                    this.user = info[0];
                    if (this.user.id === this.myUser.id) {
                      this.botonSeguirEnabled = false;
                    } else {
                      this.botonSeguirEnabled = true;
                      this.comprobarSiguiendo(this.user.username);
                    }
                  } else {
                    this.noExiste = true;
                  }
                });
              }
            );
          }
        });
      }
    });
  }

  seguirChange() {
    if (this.siguiendo){
      let index = this.myUser.siguiendo.findIndex(element => element === this.user.username);
      this.myUser.siguiendo.splice(index, 1);
      index = this.user.seguidores.findIndex(element => element === this.myUser.username);
      this.user.seguidores.splice(index, 1);

      this.firebase.actualizarSeguidores(this.user, this.myUser);

      this.siguiendo = !this.siguiendo;
    } else {
      let ref = this.myUser.siguiendo.find(element => element === this.user.username);
      let ref2 = this.user.seguidores.find(element => element === this.myUser.username);
      if (!ref && !ref2){
        this.myUser.siguiendo.push(this.user.username);
        this.user.seguidores.push(this.myUser.username);
        this.firebase.actualizarSeguidores(this.user, this.myUser);
        this.siguiendo = !this.siguiendo;
      }
    }
  }

  getSeguirColor(): string {
    if (this.siguiendo) {
      return 'rojo';
    }
    return 'azul';
  }

  editarPerfil() {
    this.router.navigate(['edit']);
  }

  comprobarSiguiendo(username: string) {
    const ref = this.myUser.siguiendo.find(element => element === this.user.username);
    if (ref) {
      this.siguiendo = true;
    } else {
      this.siguiendo = false;
    }
  }

}
