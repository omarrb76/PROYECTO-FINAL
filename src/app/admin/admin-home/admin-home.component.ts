import { FirebaseService } from './../../services/firebase.service';
import { Router } from '@angular/router';
import { TexttospeechService } from './../../services/texttospeech.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(public tts: TexttospeechService, private router: Router, private firebase: FirebaseService) { }

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

  verUsuarios(){
    this.router.navigate(['tableusers']);
  }

  verEstadisticas(){
    this.router.navigate(['tableusers']);
  }

}
