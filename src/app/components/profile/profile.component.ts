import { TexttospeechService } from './../../services/texttospeech.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  loadingUser: boolean;
  username: string;
  siguiendo: boolean;

  constructor(private activatedRoute: ActivatedRoute, public tts: TexttospeechService) {
    this.loadingUser = false;
    this.siguiendo = true;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.username = params.username;
        console.log(params.username);
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
