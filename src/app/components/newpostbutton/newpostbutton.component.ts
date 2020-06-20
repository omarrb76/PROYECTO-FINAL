import { TexttospeechService } from './../../services/texttospeech.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newpostbutton',
  templateUrl: './newpostbutton.component.html',
  styleUrls: ['./newpostbutton.component.css']
})
export class NewpostbuttonComponent implements OnInit {

  constructor(public tts: TexttospeechService) { }

  ngOnInit(): void {
  }

  newPost(){
    this.tts.play('Nueva Publicación');
  }

}
