import { TexttospeechService, Opcion } from './../../services/texttospeech.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ttsdialog',
  templateUrl: './ttsdialog.component.html',
  styleUrls: ['./ttsdialog.component.css']
})
export class TtsdialogComponent implements OnInit {

  opciones: Opcion[];
  activo = false; // Por default el lector de pantalla esta inactivo

  constructor(private tts: TexttospeechService) {
    this.tts.cargarVoces();

    this.tts.cargarVoces();
    this.opciones = this.tts.getOpciones();
  }

  ngOnInit() {}

  actualizarValor(param: boolean){
    this.activo = param;
    // console.log(this.activo);
  }

}
