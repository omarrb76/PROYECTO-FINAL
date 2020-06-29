import { User } from './../../models/user';
import { FirebaseService } from './../../services/firebase.service';
import { TexttospeechService } from './../../services/texttospeech.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post';

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
  ruta = 'http://localhost:4200/user/';
  elementType = 'url';
  value = 'Techiediaries';
  posts: Post[];
  pictures: any[];

  constructor(
    private activatedRoute: ActivatedRoute,
    public tts: TexttospeechService,
    private firebase: FirebaseService,
    private router: Router
  ) {
    this.loadingUser = true;
    this.siguiendo = true;
    this.posts = [];
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
                // Obtener valor para el codigo QR
                this.value = this.ruta + this.username;
                this.firebase.getUserDB(this.username).subscribe(async (info: User[]) => {
                  if (info.length > 0) {
                    this.user = info[0];
                    if (this.user.id === this.myUser.id) {
                      await this.getAllPosts(true);
                      this.botonSeguirEnabled = false;
                    } else {
                      await this.getAllPosts(false);
                      this.botonSeguirEnabled = true;
                      this.comprobarSiguiendo(this.user.username);
                    }
                  } else {
                    this.loadingUser = false;
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

  async seguirChange() {
    if (this.siguiendo){
      let index = this.myUser.siguiendo.findIndex(element => element === this.user.username);
      this.myUser.siguiendo.splice(index, 1);
      index = this.user.seguidores.findIndex(element => element === this.myUser.username);
      this.user.seguidores.splice(index, 1);

      await this.firebase.actualizarSeguidores(this.user, this.myUser);

      this.siguiendo = !this.siguiendo;
    } else {
      const ref = this.myUser.siguiendo.find(element => element === this.user.username);
      const ref2 = this.user.seguidores.find(element => element === this.myUser.username);
      if (!ref && !ref2){
        this.myUser.siguiendo.push(this.user.username);
        this.user.seguidores.push(this.myUser.username);
        await this.firebase.actualizarSeguidores(this.user, this.myUser);
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

  async getAllPosts(tuCuenta: boolean){

    // Si esta viendo su propia cuenta
    if (tuCuenta){
      await this.firebase.getAllPosts([], tuCuenta).then((res: any) => this.posts = res);
    } else {
      await this.firebase.getAllPosts([this.user.username], tuCuenta).then((res: any) => this.posts = res);
    }
    await this.firebase.getProfilePictures([this.user.username]).then((res: any) => this.pictures = res);
    this.loadingUser = false;
  }

}
