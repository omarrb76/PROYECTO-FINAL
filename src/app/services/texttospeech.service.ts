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
  primeraVez = true; // Para cargar las voces
  idioma: any;
  active = false; // Por defecto el accesibilidad viene descativado
  selectedIndex = 0; // Para que se seleccione automaticamente en el select del dialog

  // Para guardar el estado anterior, por si el usuario no dio aceptar en el dialog
  idiomaCache: any;
  activeCache = false;
  selectedIndexCache = 0;

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
    this.selectedIndex = indice;
    this.idioma = this.vocesDisponibles[indice];
  }

  getIdioma() {
    return this.idioma;
  }

  // Para cambiar el valor y saber si se va a reproducir el sonido o no
  setActivo(valor: boolean) {
    this.active = valor;
  }

  getActivo() {
    return this.active;
  }

  getSelectedIndex() {
    return this.selectedIndex;
  }

  play(message: any) {
    // console.log(message.target.innerHTML);

    // Es un mensaje en especifico que yo mando, y quiero que se reproduzca aunque el active este en falso por que quiero que suene
    if (message === 'El lector de pantalla esta desactivado') {
      speechSynthesis.cancel();

      const mensaje = new SpeechSynthesisUtterance();
      mensaje.voice = this.idioma;
      mensaje.volume = 1;
      mensaje.rate = 1;
      mensaje.text = message;
      mensaje.pitch = 1;

      speechSynthesis.speak(mensaje);
      return;
    }

    // Solo si esta la opcion activa hara el sonido
    if (this.active) {

      speechSynthesis.cancel();

      const mensaje = new SpeechSynthesisUtterance();
      mensaje.voice = this.idioma;
      mensaje.volume = 1;
      mensaje.rate = 1;
      mensaje.text = message;
      mensaje.pitch = 1;

      speechSynthesis.speak(mensaje);
    }
  }

  // Para guardar las opciones antes de que se editaran sin guardar
  guardarEstado() {
    this.idiomaCache = this.idioma;
    this.activeCache = this.active;
    this.selectedIndexCache = this.selectedIndex;
  }

  // Recuperar los valores anteriores en caso de que no se hayan guardado
  recuperarEstado() {
    this.idioma = this.idiomaCache;
    this.active = this.activeCache;
    this.selectedIndex = this.selectedIndexCache;
  }

  getEnabled() {
    if (this.active) {
      return 1;
    }
    return -1;
  }

}
