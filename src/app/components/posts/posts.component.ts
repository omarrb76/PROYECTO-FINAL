import { User } from './../../models/user';
import { Notification } from './../../models/notification';
import { Post } from './../../models/post';
import { ListPersonsDialogComponent } from './../list-persons-dialog/list-persons-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseService } from './../../services/firebase.service';
import { TexttospeechService } from './../../services/texttospeech.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  @Input() posts: Post[] = [];
  @Input() username = '';
  @Input() pictures: any[] = [];
  disabled = false;
  postsVisibles: Post[] = [];
  index = 0;
  postsAcabados = false;

  constructor(
    private router: Router,
    public tts: TexttospeechService,
    private firebase: FirebaseService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadMorePosts();
  }

  goToProfile(username: string) {
    this.router.navigate([`user/${username}`]);
  }

  formatDate(date: Date): string {
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  }

  async darLike(post: Post) {
    const index = this.getLike(post);
    this.disabled = true;
    if (index > -1) {
      post.likes.splice(index, 1);
      this.quitarNotificacion(post);
    } else {
      post.likes.push(this.username);
      this.nuevaNotificacion(post);
    }
    await this.firebase.actualizarPost(post).then(res => this.disabled = false);
  }

  getLike(post: Post) {
    return post.likes.findIndex(element => element === this.username);
  }

  getEyColor(post: Post): string {
    const index = this.getLike(post);
    if (index > -1) {
      return 'verde';
    } else {
      return 'negro';
    }
  }

  getProfilePicture(username: string) {
    const index = this.pictures.findIndex(element => element.username === username);
    return index > -1 ? this.pictures[index].picture : '';
  }

  verEys(post: Post) {
    this.dialog.open(ListPersonsDialogComponent, { data: { users: post.likes, accion: 'Usuarios que dieron eys' } });
  }

  loadMorePosts() {
    let i = 0;
    for (i = this.index; i < this.index + 5; i++) {
      if (this.posts[i] === undefined) {
        this.postsAcabados = true;
        break;
      }
      this.postsVisibles.push(this.posts[i]);
    }
    this.index = i;
  }

  formatText(text: string) {
    let res = '';
    for (let i = 0, x = 0; i < text.length; i++) {
      if (x >= 20) {
        res += ' ';
        x = 0;
        i--;
        continue;
      }
      if (text.charAt(i) === ' ') {
        x = 0;
      }
      res += text.charAt(i);
      x++;
    }
    return res;
  }

  async nuevaNotificacion(post: Post) {
    const notificacion: Notification = {
      post: post.date.getTime().toString(),
      username: this.username,
      date: new Date(),
      leido: false
    };
    let tempUser: User;
    await this.firebase.getUsersDB([post.username]).then(res => tempUser = res[0]);
    tempUser.notifications.push(notificacion);
    await this.firebase.actualizarUsuario(tempUser);
  }

  async quitarNotificacion(post: Post) {
    let tempUser: User;
    await this.firebase.getUsersDB([post.username]).then(res => tempUser = res[0]);
    const index = tempUser.notifications.findIndex(element => element.post === post.date.getTime().toString());
    if (index > -1) {
      tempUser.notifications.splice(index, 1);
      await this.firebase.actualizarUsuario(tempUser);
    }
  }

}
