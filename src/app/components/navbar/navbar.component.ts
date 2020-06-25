import { User } from './../../models/user';
import { FirebaseService } from './../../services/firebase.service';
import { Router } from '@angular/router';
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
  options: User[];
  filteredOptions: Observable<any>;
  show = false;
  notifications = 5;
  active = false;
  user: User;
  loading = true;

  constructor(
    public tts: TexttospeechService,
    private snackBarService: SnackbarService,
    public dialog: MatDialog,
    private router: Router,
    private firebase: FirebaseService) { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.firebase.getUsuarioConectado().subscribe((user: firebase.User) => {
      if (user) {
        this.active = true;
        this.firebase.getPersonalInfo(user.email).subscribe((data: any) => {
          if (data) {
            this.firebase.setUser(data[0]);
            this.user = this.firebase.getUser();
            this.loading = false;
            this.user.picture = 'https://img.redbull.com/images/c_crop,x_0,y_0,h_2160,w_3240/c_fill,w_1500,h_1000/q_auto,f_auto/redbullcom/2019/02/08/89cd6b51-bf77-485e-bfd5-158940cbc1f2/apex-legends-bloodhound';
          }
        });
      } else {
        this.active = false;
      }
    });

    this.firebase.cargarUsuarios().subscribe((data: any) => {
      this.options = data;
    });
  }

  // Para el autocomplete
  displayFn(subject) {
    return subject ? subject.name : undefined;
  }

  private _filter(value: string): User[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.username.toLowerCase().includes(filterValue));
  }

  userPage(opcion: any) {
    this.router.navigate([`user/${opcion.username}`]);
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

  navegarUsuario(sidenav: any, option: boolean) {
    if (option) {
      sidenav.toggle();
    }
    const link = 'user/' + this.user.username;
    this.router.navigate([link]);
  }
}
