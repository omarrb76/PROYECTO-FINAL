import { MatDialog } from '@angular/material/dialog';
import { NotificationsdialogComponent } from './../notificationsdialog/notificationsdialog.component';
import { SnackbarService } from './../../services/snackbar.service';
import { Observable } from 'rxjs';
import { TexttospeechService } from './../../services/texttospeech.service';
import { Component, OnInit } from '@angular/core';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // options = []; // Aqui se guardan los usuarios
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<any>;
  show = false;
  notifications = 5;

  constructor(public tts: TexttospeechService, private snackBarService: SnackbarService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  // Para el autocomplete
  displayFn(subject) {
    return subject ? subject.name : undefined;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  userPage(opcion: any) {
    console.log(opcion);
  }

  updatedVal(e) {
    if (e && e.length >= 1) {
      this.show = true;
    } else {
      this.show = false;
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(NotificationsdialogComponent);
    dialogRef.afterClosed().subscribe((result) => {

      // Una vez que el usuario cierre el panel, nosotros borramos las notificaciones
      console.log(result);

    });
  }
}
