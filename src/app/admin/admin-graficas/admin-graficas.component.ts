import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { SingleDataSet, Color, BaseChartDirective, Label } from 'ng2-charts';
import { FirebaseService } from './../../services/firebase.service';
import { Router } from '@angular/router';
import { TexttospeechService } from './../../services/texttospeech.service';
import { User } from './../../models/user';

@Component({
  selector: 'app-admin-graficas',
  templateUrl: './admin-graficas.component.html',
  styleUrls: ['./admin-graficas.component.css']
})
export class AdminGraficasComponent implements OnInit {

  users: User[];
  cargando: boolean;

  // Datos para gráfica de barras
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Seguidores' },
    { data: [], label: 'Siguiendo' }
  ];

  // Datos pastel
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = ['Mujeres', 'Hombres'];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  // Datos de grafica lineal
  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Seguidores' },
    { data: [], label: 'Siguiendo' }
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  // Datos grafica de radar
  public polarAreaChartLabels: Label[] = [];
  public polarAreaChartData: SingleDataSet = [];
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';

  constructor(public tts: TexttospeechService, private router: Router, private firebase: FirebaseService) {  }

  ngOnInit(): void {

    this.firebase.getUsuarioConectado().subscribe((user: firebase.User) => {
      // console.log('Usuario: ', user);
      if (user) {
        this.firebase.getUserDB(user.displayName).subscribe((data: any) => {
          if (data && data[0].admin === true) {
          } else {
            this.router.navigate(['home']);
          }
        });
      } else {
        this.router.navigate(['home']);
      }
    });

    this.cargando = true;
    let hombres = 0;
    let mujeres = 0;
    let acumSeg = 0;
    let acumSig = 0;

    this.firebase.cargarUsuarios().subscribe((data: User[]) => {
      this.users = data;
      this.cargando = false;
      this.users.forEach(element => {
        if (element.sexo === 'hombre'){
          hombres++;
        }
        else{
          mujeres++;
        }
        this.barChartData[0].data.push(element.seguidores.length);
        this.barChartData[1].data.push(element.siguiendo.length);
        this.barChartLabels.push(element.username);

        this.polarAreaChartData.push(element.seguidores.length + element.seguidores.length);
        this.polarAreaChartLabels.push(element.username);

        acumSeg += element.seguidores.length;
        acumSig += element.siguiendo.length;
        this.lineChartData[0].data.push(acumSeg);
        this.lineChartData[1].data.push(acumSig);
        this.lineChartLabels.push(element.username);
      });
      while (this.pieChartData.length > 0){
        this.pieChartData.pop();
      }
      this.pieChartData.push(mujeres);
      this.pieChartData.push(hombres);
    });
  }

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
