import { TexttospeechService, Opcion } from './../../services/texttospeech.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ttsdialog',
  templateUrl: './ttsdialog.component.html',
  styleUrls: ['./ttsdialog.component.css']
})
export class TtsdialogComponent implements OnInit {

  opciones: Opcion[];
  activo: boolean;
  selectedIndex: number;

  constructor(private tts: TexttospeechService) {
    this.tts.cargarVoces();

    this.tts.cargarVoces();
    this.opciones = this.tts.getOpciones();

    this.activo = this.tts.getActivo();
    this.selectedIndex = this.tts.getSelectedIndex();
  }

  ngOnInit() {}

  actualizarValor(param: boolean){
    this.tts.setActivo(param);
  }

}
