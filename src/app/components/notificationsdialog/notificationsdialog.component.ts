import { Router } from '@angular/router';
import { Post } from './../../models/post';
import { Notification } from './../../models/notification';
import { User } from './../../models/user';
import { FirebaseService } from './../../services/firebase.service';
import { TexttospeechService } from './../../services/texttospeech.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notificationsdialog',
  templateUrl: './notificationsdialog.component.html',
  styleUrls: ['./notificationsdialog.component.css']
})
export class NotificationsdialogComponent implements OnInit {

  username: string;
  user: User;
  notifications: Notification[] = [];
  loading = true;
  pictures: any[] = [];
  postPictures: Post[] = [];
  disabled = false;

  constructor(
    public tts: TexttospeechService,
    private firebase: FirebaseService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {
    this.username = data.username;
  }

  async ngOnInit() {
    await this.firebase.getUsersDB([this.username]).then(res => this.user = res[0]);
    this.notifications = this.user.notifications;
    this.ordenar();
    await this.getPictures();
    await this.getPostsPictures();
    this.loading = false;
    this.disabled = false;
  }

  ordenar() {
    this.notifications.sort((a: Notification, b: Notification) => {
      if (a.date > b.date) {
        return -1;
      } else if (a.date < b.date) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  formatDate(date: any): string {
    date = date.toDate();
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  }

  async getPictures() {
    const users: string[] = [];
    this.notifications.forEach(element => users.push(element.username));
    await this.firebase.getProfilePictures(users).then((res: any) => this.pictures = res);
  }

  getProfilePicture(username: string) {
    const index = this.pictures.findIndex(element => element.username === username);
    return index > -1 ? this.pictures[index].picture : '';
  }

  getNotificationDialogue(not: Notification): string {
    if (not.post !== '') {
      return not.username + ' ha reaccionado a tu publicación del ' + this.formatDate(not.date);
    }
    return not.username + ' ha empezado a seguirte el ' + this.formatDate(not.date);
  }

  async getPostsPictures() {
    await this.firebase.getAllPosts([], true).then((res: Post[]) => this.postPictures = res);
  }

  getPostPicture(postId: string) {
    const id = parseInt(postId, 10);
    const index = this.postPictures.findIndex(element => element.date.getTime() === id);
    return index > -1 ? this.postPictures[index].image : '';
  }

  async borrarNotifications() {
    this.disabled = true;
    this.user.notifications = [];
    this.notifications = [];
    await this.firebase.actualizarUsuario(this.user).then(res => this.disabled = false);
  }

  async marcarComoLeido(not: Notification) {
    this.disabled = true;
    const index = this.user.notifications.indexOf(not);
    if (index > -1) {
      this.user.notifications[index].leido = true;
      this.notifications = this.user.notifications;
      await this.firebase.actualizarUsuario(this.user).then(res => this.disabled = false);
    }
  }

  async marcarTodoComoLeido() {
    this.disabled = true;
    this.user.notifications.forEach(element => element.leido = true);
    this.notifications = this.user.notifications;
    await this.firebase.actualizarUsuario(this.user).then(res => this.disabled = false);
  }

  async goToProfile(username: string, cerrar: any, not: Notification) {
    await this.marcarComoLeido(not);
    cerrar.click();
    this.router.navigate([`user/${username}`]);
  }

}
