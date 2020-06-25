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
  noExiste = false;

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
      }
    });

    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.username = params.username;
        this.firebase.getUserDB(this.username).subscribe((data: User[]) => {
          this.loadingUser = false;
          if (data.length > 0) {
            this.user = data[0];
          } else {
            this.noExiste = true;
          }
        });
      }
    );
  }

  seguirChange() {
    this.siguiendo = !this.siguiendo;
  }

  getSeguirColor(): string {
    if (this.siguiendo) {
      return 'rojo';
    }
    return 'azul';
  }

}
