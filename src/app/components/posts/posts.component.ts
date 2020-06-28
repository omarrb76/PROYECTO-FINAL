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

  constructor(private router: Router, public tts: TexttospeechService) {}

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
  }

  getEyColor(post: Post) {
    return 'verde';
  }

  getProfilePicture(username: string){
    const index = this.pictures.findIndex(element => element.username === username);
    return this.pictures[index].picture;
  }

}
