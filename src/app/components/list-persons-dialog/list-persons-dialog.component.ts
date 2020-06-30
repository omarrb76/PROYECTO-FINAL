import { TexttospeechService } from './../../services/texttospeech.service';
import { Router } from '@angular/router';
import { User } from './../../models/user';
import { FirebaseService } from './../../services/firebase.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-list-persons-dialog',
  templateUrl: './list-persons-dialog.component.html',
  styleUrls: ['./list-persons-dialog.component.css']
})
export class ListPersonsDialogComponent implements OnInit {

  users: User[] = [];
  loading = true;
  accion = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firebase: FirebaseService,
    private router: Router,
    public tts: TexttospeechService
  ) {
    this.accion = data.accion;
  }

  async ngOnInit() {
    await this.firebase.getUsersDB(this.data.users).then((res: any) => {
      this.users = res;
      this.loading = false;
    });
  }

  goToProfile(username: string, cerrar: any) {
    this.router.navigate([`user/${username}`]);
    cerrar.click();
  }

}
