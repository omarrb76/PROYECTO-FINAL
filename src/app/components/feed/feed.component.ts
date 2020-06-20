import { Router } from '@angular/router';
import { TexttospeechService } from './../../services/texttospeech.service';
import { Component, OnInit } from '@angular/core';

const INFO: Post[] = [];

function llenarInfo() {
  for (let i = 0; i < 15; i++) {
    const temp = {
      id: i,
      profilePicture: 'https://okdiario.com/img/2019/04/04/el-increible-hulk-655x368.jpg',
      date: new Date(2020, 5, i + 1),
      username: 'omarrb76',
      name: 'Omar Ruiz',
      imagen: 'https://media.revistagq.com/photos/5ca5f6a77a3aec0df5496c59/master/w_2044,c_limit/bob_esponja_9564.png',
      text: 'Es mi primer post',
      eys: []
    };
    INFO.push(temp);
  }
}

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  allPosts = INFO;
  posts: any[];
  loadingPosts: boolean;
  index = 0;

  constructor(public tts: TexttospeechService, private router: Router) {
    llenarInfo();
    this.loadingPosts = false;
    this.posts = [];
  }

  ngOnInit(): void {
    this.loadMorePosts();
  }

  getEyColor(post: Post) {
    if (post.eys.find((element) => element === 'andrea')) {
      return 'verde';
    } else {
      return 'negro';
    }
  }

  darLike(post: Post) {
    const username = 'andrea';
    const found = post.eys.find((element) => element === 'andrea');
    console.log(found);
    const res = this.posts.findIndex((element) => element.id === post.id);
    if (!found){
      console.log(res);
      this.posts[res].eys.push(username);
    } else {
      const borrar = this.posts[res].eys.indexOf(username);
      if (borrar > -1){
        this.posts[res].eys.splice(borrar, 1);
      }
    }
  }

  goToProfile(username: string) {
    this.router.navigate([`user/${username}`]);
  }

  loadMorePosts() {
    console.log(this.index);

    let sum = 0;

    for (let i = this.index; i < this.index + 5; i++) {
      if (this.allPosts[i] !== undefined) {
        this.posts.push(this.allPosts[i]);
        sum++;
      } else {
        break;
      }
    }

    this.index += sum;
  }

}

interface Post {
  id: number,
  profilePicture: any;
  username: string;
  name: string;
  date: Date;
  imagen: any;
  text: string;
  eys: string[]; // En el array de string se guardan los usernames y para saber cuantos eys tiene, usamos el atributo length
}
