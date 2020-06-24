import { Router } from '@angular/router';
import { TexttospeechService } from './../../services/texttospeech.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(public tts: TexttospeechService, private router: Router) { }

  ngOnInit(): void {
  }

  verUsuarios(){
    this.router.navigate(['tableusers']);
  }

  verEstadisticas(){
    this.router.navigate(['tableusers']);
  }

}
