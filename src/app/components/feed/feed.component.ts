import { User } from './../../models/user';
import { FirebaseService } from './../../services/firebase.service';
import { Router } from '@angular/router';
import { TexttospeechService } from './../../services/texttospeech.service';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  allPosts: Post[] = [];
  posts: any[];
  loadingPosts = true;
  index = 0;
  user: User;
  pictures: any[];

  constructor(
    public tts: TexttospeechService,
    private firebase: FirebaseService,
    private router: Router
  ) {
    this.posts = [];
  }

  ngOnInit(): void {

    this.firebase.getUsuarioConectado().subscribe((user: firebase.User) => {
      if (!user) {
        this.router.navigate(['home']);
      } else {
        this.firebase.getUserDB(user.displayName).subscribe((data: any) => {
          if (data) {
            this.firebase.setUser(data[0]);
            this.user = this.firebase.getUser();
            this.getAllPosts();
          }
        });
      }
    });
  }

  loadMorePosts() {
    /* console.log(this.index);

    let sum = 0;

    for (let i = this.index; i < this.index + 5; i++) {
      if (this.allPosts[i] !== undefined) {
        this.posts.push(this.allPosts[i]);
        sum++;
      } else {
        break;
      }
    }

    this.index += sum; */
  }

  async getAllPosts(){
    await this.firebase.getAllPosts(this.user.siguiendo).then((res: any) => this.allPosts = res);
    await this.firebase.getProfilePictures(this.user.siguiendo).then((res: any) => this.pictures = res);
    this.loadingPosts = false;
    this.posts = this.allPosts;
  }

}
