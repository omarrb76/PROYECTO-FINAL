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

  myControl = new FormControl();
  options: User[];
  filteredOptions: Observable<any>;
  show = false;
  active = false;
  user: User;
  loading = true;
  admin = false;

  constructor(
    public tts: TexttospeechService,
    private snackBarService: SnackbarService,
    public dialog: MatDialog,
    private router: Router,
    private firebase: FirebaseService) {
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.firebase.getUsuarioConectado().subscribe((user: firebase.User) => {
      if (user) {
        this.firebase.getUserDB(user.displayName).subscribe((data: any) => {
          if (data) {
            this.firebase.setUser(data[0]);
            this.user = this.firebase.getUser();
            this.loading = false;
            if (this.user.admin) {
              this.admin = true;
            } else {
              this.admin = false;
            }
            this.active = true;
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

  async openDialog() {
    const dialogRef = this.dialog.open(NotificationsdialogComponent, { data: { username: this.user.username } });
  }

  getNotificationsLength(){
    let res = 0;
    this.user.notifications.forEach(element => {
      if (element.leido === false){
        res++;
      }
    });
    return res;
  }

  navegarUsuario(sidenav: any, option: boolean) {
    if (option) {
      sidenav.toggle();
    }
    const link = 'user/' + this.user.username;
    this.router.navigate([link]);
  }

  administrador() {
    this.router.navigate(['adminhome']);
  }

  obtainAlign() {
    if (this.user.admin) {
      console.log('centee');
      return 'center';
    }
    return 'start';
  }
}
