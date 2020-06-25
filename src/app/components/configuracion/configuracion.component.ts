import { FirebaseService } from './../../services/firebase.service';
import { Router } from '@angular/router';
import { TexttospeechService } from './../../services/texttospeech.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  constructor(public tts: TexttospeechService, private router: Router, private firebase: FirebaseService) { }

  ngOnInit(): void {
    this.firebase.getUsuarioConectado().subscribe((user: firebase.User) => {
      if (!user) {
        this.router.navigate(['home']);
      }
    });
  }

  cerrarSesion(){
    this.firebase.logout();
    this.router.navigate(['home']);
  }

  editarInfo(){
    this.router.navigate(['edit']);
  }

}
