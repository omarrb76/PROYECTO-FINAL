import { ListPersonsDialogComponent } from './../list-persons-dialog/list-persons-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseService } from './../../services/firebase.service';
import { TexttospeechService } from './../../services/texttospeech.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/post';

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

  constructor(
    private router: Router,
    public tts: TexttospeechService,
    private firebase: FirebaseService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
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
    } else {
      post.likes.push(this.username);
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

}
