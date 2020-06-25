import { FirebaseService } from './../../services/firebase.service';
import { TexttospeechService } from './../../services/texttospeech.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  active = false;

  constructor(private router: Router, public tts: TexttospeechService, private firebase: FirebaseService) { }

  ngOnInit(): void {
    this.firebase.getUsuarioConectado().subscribe((user: firebase.User) => {
      if (user) {
        this.active = true;
      } else {
        this.active = false;
      }
    });
  }

  regresarLOGIN() {
    this.router.navigate(['/home']);
  }

}
