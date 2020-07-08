import { TexttospeechService } from './../../services/texttospeech.service';
import { Component, OnInit } from '@angular/core';

interface Carta {
  name: string;
  nickname: string;
  imagen: string;
  description: string;
  facebook: string;
}

const INFORMACION: Carta[] = [
  {
    name: 'Daniela Rodriguez',
    nickname: 'Lala',
    imagen: '../../../assets/img/daniela.jpg',
    description: 'Daniela, estudiante de la UAA y miembro del equipo DEDO. El toque femenino que este equipo necesita. Le gusta ver novelas koreanas y la cumbia. Ella fue la encargada del versionamiento de este proyecto.',
    facebook: 'https://www.facebook.com/ya.el.rodr'
  },
  {
    name: 'Eduardo González',
    nickname: 'Luigi',
    imagen: '../../../assets/img/luigi.jpg',
    description: 'Luigi es un aficionado por la programación y le apasiona crear cosas geniales en su tiempo libre, sin duda un gran acompañante durante este proyecto. El fue el encargado de la base de datos de este proyecto.',
    facebook: 'https://www.facebook.com/profile.php?id=100001480089327'
  },
  {
    name: 'Daniel Arroyo',
    nickname: 'Tzoali',
    imagen: '../../../assets/img/tzoali.jpg',
    description: 'Tzoali es un genio de las matemáticas y programación competitiva. Le gusta mucho Stephen King y las películas de miedo. Tzoali es el encargado de las estadísticas, códigos QR del proyecto y la PWA.',
    facebook: 'https://www.facebook.com/danieltzoali.arroyovaldivia'
  },
  {
    name: 'Omar Ruiz',
    nickname: 'Niño',
    imagen: '../../../assets/img/omar.jpg',
    description: 'Omar es un chico que le gustan los superhéroes y la programación, siempre busca como resolver los problemas en Internet. Omar es responsable del uso de Angular Material y el lector de pantalla en el proyecto.',
    facebook: 'https://www.facebook.com/profile.php?id=100050414831990'
  },
];

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  equipo = INFORMACION;

  constructor(public tts: TexttospeechService) { }

  ngOnInit(): void {
  }

}
