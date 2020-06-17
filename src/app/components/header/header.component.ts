import { TexttospeechService } from './../../services/texttospeech.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  active = true;

  constructor(private router: Router, public tts: TexttospeechService) { }

  ngOnInit(): void {
  }

  regresarLOGIN() {
    this.router.navigate(['/home']);
  }

}
