import { TexttospeechService } from './../../services/texttospeech.service';
import { Component, OnInit } from '@angular/core';

interface Pregunta {
  titulo: string;
  info: string;
  contenido: string;
}

const PREGUNTAS: Pregunta[] = [
  {
    titulo: '¿Qué es Simple?',
    info: 'La pregunta más importante de todas',
    contenido: 'Simple es una red social creada como proyecto final, que tiene como objetivo conectar' +
    ' a las personas de la manera mas sencilla posible. Simple es una red social fácil de usar ya que no' +
    'tiene muchas opciones como las demás, esto la hace perfecta para que cualquiera pueda aprender a usar la red.'
  },
  {
    titulo: '¿Es seguro usar Simple?',
    info: '¡Claro que es seguro!',
    contenido: 'En Simple jamas compartiremos tus datos con nadie, eres dueño de tu propia información y queremos' +
    ' que tu lo sepas.' +
    'Simple solo guarda tu nombre de usuario, contraseña y sexo.'
  },
  {
    titulo: '¿Cómo encuentro más amigos en la red?',
    info: 'Usa el buscador de la app',
    contenido: 'Busca a otros usuarios usando el botón de buscar en la app, este mostrará los resultados de' +
    ' usuarios que coinciden con tu búsqueda.'
  },
  {
    titulo: '¿Cómo configuro mi perfil?',
    info: 'Cambia tu información dentro de las opciones',
    contenido: 'Accede al menu de opciones desde la página de inicio (una vez estando logeado) y ahí podrás' +
    ' cambiar información básica como nombre y contraseña.'
  },
  {
    titulo: '¿Qué son los eys?',
    info: 'Reacciona a las publicaciones de los demás',
    contenido: 'Sirve para indicar que te gusta la publicación de alguien. Así la persona que lo publicó sepa que' +
    ' tiene seguidores que le agrada su contenido.'
  }
];

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  frecuentes = PREGUNTAS;

  constructor(public tts: TexttospeechService) { }

  ngOnInit(): void {
  }

}
