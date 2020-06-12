import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

// Seleccionar estos idiomas por defecto, en caso de que existan
const IDIOMAS_PREFERIDOS = ['es-MX', 'es-US', 'es-ES', 'es_US', 'es_ES'];

export interface Opcion {
  value: number;
  innerHTML: string;
  selected: number;
}

@Injectable({
  providedIn: 'root'
})
export class TexttospeechService {
  posibleIndice = 0;
  vocesDisponibles = [];
  opciones = [];
  primeraVez = true;
  idioma: any;

  constructor() { }

  cargarVoces() {

    if (this.vocesDisponibles.length > 0 && !this.primeraVez) {
      /* console.log('No se cargan las voces porque ya existen: ', this.vocesDisponibles); */
      return;
    }

    this.primeraVez = false;

    this.vocesDisponibles = speechSynthesis.getVoices();

    /* console.log(this.vocesDisponibles);
    console.log(speechSynthesis.getVoices()); */

    this.posibleIndice = this.vocesDisponibles.findIndex(voz => IDIOMAS_PREFERIDOS.includes(voz.lang));
    if (this.posibleIndice === -1) {
      this.posibleIndice = 0;
    }
    this.vocesDisponibles.forEach((voz, indice) => {

      // Estaremos guardando las opiones y las mostraremos con interpolacion

      const opcion: Opcion = {
        value: indice,
        innerHTML: voz.name,
        selected: this.posibleIndice
      };

      this.opciones.push(opcion);

    });
  }

  cambiarVoz() {
    this.cargarVoces();
  }

  getOpciones() {
    return this.opciones;
  }

  setIdioma(indice: number) {
    this.idioma = this.vocesDisponibles[indice];
  }

  getIdioma() {
    return this.idioma;
  }

  play(message: string) {
    console.log(message);

    const mensaje = new SpeechSynthesisUtterance();
    mensaje.voice = this.idioma;
    mensaje.volume = 1;
    mensaje.rate = 1;
    mensaje.text = message;
    mensaje.pitch = 1;

    speechSynthesis.speak(mensaje);
  }

}
