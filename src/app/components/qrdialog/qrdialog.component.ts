import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-qrdialog',
  templateUrl: './qrdialog.component.html',
  styleUrls: ['./qrdialog.component.css']
})
export class QrdialogComponent implements OnInit {

  ruta = 'http://localhost:4200/user/';
  elementType = 'url';
  value = 'Techiediaries';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.value = this.ruta + data.username;
  }

  ngOnInit(): void {
  }

}
