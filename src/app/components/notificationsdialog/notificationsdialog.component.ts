import { TexttospeechService } from './../../services/texttospeech.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notificationsdialog',
  templateUrl: './notificationsdialog.component.html',
  styleUrls: ['./notificationsdialog.component.css']
})
export class NotificationsdialogComponent implements OnInit {

  constructor(public tts: TexttospeechService) { }

  ngOnInit(): void {
  }

}
