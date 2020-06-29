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

  constructor(private router: Router, public tts: TexttospeechService, private firebase: FirebaseService) {}

  ngOnInit(): void {
    console.log(this.username);
    console.log(this.posts);
    console.log(this.pictures);
  }

  goToProfile(username: string) {
    this.router.navigate([`user/${username}`]);
  }

  formatDate(date: Date): string {
    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  }

  darLike(post: Post) {
    const index = this.getLike(post);
    if (index > -1){
      post.likes.splice(index, 1);
    } else {
      post.likes.push(this.username);
    }
    this.firebase.actualizarPost(post);
  }

  getLike(post: Post){
    return post.likes.findIndex(element => element === this.username);
  }

  getEyColor(post: Post): string {
    const index = this.getLike(post);
    if (index > -1){
      return 'verde';
    } else {
      return 'negro';
    }
  }

  getProfilePicture(username: string){
    const index = this.pictures.findIndex(element => element.username === username);
    return index > -1 ? this.pictures[index].picture : '';
  }

}
