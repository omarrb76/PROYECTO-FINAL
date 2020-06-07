import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    imagen: 'https://scontent.fntr5-1.fna.fbcdn.net/v/t1.0-9/22406156_846159608893888_4597893129202280458_n.jpg?_nc_cat=102&_nc_sid=85a577&_nc_eui2=AeGY37VAg7NmXTEC0_DaOmEXGcieITqX6tIZyJ4hOpfq0lTdxPf5KJ5nI9aOvtm69YBKxC6bEGfD573xfDqrHUJ9&_nc_ohc=MJHD0IesWIoAX-_tjUk&_nc_ht=scontent.fntr5-1.fna&oh=5634ceb2b605d5bd951a542b5a6aa4e8&oe=5F0271DA',
    description: 'Daniela, estudiante de la UAA y miembro del equipo DEDO. El toque femenino que este equipo necesita. Le gusta ver novelas koreanas y la cumbia. Ella fue la encargada del versionamiento de este proyecto.',
    facebook: 'https://www.facebook.com/ya.el.rodr'
  },
  {
    name: 'Eduardo González',
    nickname: 'Luigi',
    imagen: 'https://scontent.fntr5-1.fna.fbcdn.net/v/t1.0-9/9201_1056861674373159_7642633853600917466_n.jpg?_nc_cat=105&_nc_sid=85a577&_nc_eui2=AeHMIxKibdAvjUfK-Gpc_HqwgX9BYBew496Bf0FgF7Dj3sq2febezN_zUt1We-MBZ53PlcLGkV-n9NEGQ3k9wnf5&_nc_ohc=FrmVHs8ps0oAX81P1YD&_nc_ht=scontent.fntr5-1.fna&oh=8fbcf96d90d35142f02491a43849d60f&oe=5F03A2B1',
    description: 'Luigi es un aficionado por la programación y le apasiona crear cosas geniales en su tiempo libre, sin duda un gran acompañante durante este proyecto. El fue el encargado de la base de datos de este proyecto.',
    facebook: 'https://www.facebook.com/profile.php?id=100001480089327'
  },
  {
    name: 'Daniel Arroyo',
    nickname: 'Tzullivan',
    imagen: 'https://scontent.fntr5-1.fna.fbcdn.net/v/t1.0-9/23659278_2059791644253437_5599313681842977823_n.jpg?_nc_cat=111&_nc_sid=7aed08&_nc_eui2=AeFI9eP3zKdh5DXZNz4BfeSvtKPuINkm4NK0o-4g2Sbg0g6riYaJlvhQ-ocBknoaayzhNLdKtSL8iao3YXm_6-Zi&_nc_ohc=6U1cPqhTIU0AX9nEE_3&_nc_ht=scontent.fntr5-1.fna&oh=15e584a35275c0f8f1e2e51bec5b9190&oe=5F014DFE',
    description: 'Tzoali es un genio de las matemáticas y programación competitiva. Le gusta mucho Stephen King y las películas de miedo. Tzoali es el encargado de las estadísticas y códigos QR del proyecto.',
    facebook: 'https://www.facebook.com/danieltzoali.arroyovaldivia'
  },
  {
    name: 'Omar Ruiz',
    nickname: 'Niño',
    imagen: 'https://scontent.fntr5-1.fna.fbcdn.net/v/t1.0-9/98002600_124982945858866_4784001077005516800_n.jpg?_nc_cat=100&_nc_sid=85a577&_nc_eui2=AeFj_jw9JC8Yabtpt9tMaeBTn_ZPAUqNp-Cf9k8BSo2n4CHKB4Sz9lRSiW102KaGvP26EPCCMNSizLoVd4cxglWD&_nc_ohc=zchnE575MCoAX90csWp&_nc_ht=scontent.fntr5-1.fna&oh=e230069694d8917c2b37a6ce93965bd3&oe=5F011C23',
    description: 'Omar es un chico que le gustan los superhéroes y la programación, siempre busca como resolver los problemas en Internet. Omar es responsable del uso de Angular Material en el proyecto.',
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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  regresarLOGIN(){
    this.router.navigate(['/home']);
  }

}
