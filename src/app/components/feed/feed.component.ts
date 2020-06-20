import { Router } from '@angular/router';
import { TexttospeechService } from './../../services/texttospeech.service';
import { Component, OnInit } from '@angular/core';

const INFO = [
  {
    profilePicture: 'https://okdiario.com/img/2019/04/04/el-increible-hulk-655x368.jpg',
    username: 'omarrb76',
    name: 'Omar Ruiz',
    imagen: 'https://media.revistagq.com/photos/5ca5f6a77a3aec0df5496c59/master/w_2044,c_limit/bob_esponja_9564.png',
    text: 'Es mi primer post'
  },
  {
    profilePicture: 'https://okdiario.com/img/2019/04/04/el-increible-hulk-655x368.jpg',
    username: 'omarrb76',
    name: 'Omar Ruiz',
    imagen: 'https://media.revistagq.com/photos/5ca5f6a77a3aec0df5496c59/master/w_2044,c_limit/bob_esponja_9564.png',
    text: 'Es mi primer post'
  },
  {
    profilePicture: 'https://okdiario.com/img/2019/04/04/el-increible-hulk-655x368.jpg',
    username: 'omarrb76',
    name: 'Omar Ruiz',
    imagen: 'https://media.revistagq.com/photos/5ca5f6a77a3aec0df5496c59/master/w_2044,c_limit/bob_esponja_9564.png',
    text: 'Es mi primer post'
  },
  {
    profilePicture: 'https://okdiario.com/img/2019/04/04/el-increible-hulk-655x368.jpg',
    username: 'omarrb76',
    name: 'Omar Ruiz',
    imagen: 'https://media.revistagq.com/photos/5ca5f6a77a3aec0df5496c59/master/w_2044,c_limit/bob_esponja_9564.png',
    text: 'Es mi primer post'
  },
  {
    profilePicture: 'https://okdiario.com/img/2019/04/04/el-increible-hulk-655x368.jpg',
    username: 'omarrb76',
    name: 'Omar Ruiz',
    imagen: 'https://media.revistagq.com/photos/5ca5f6a77a3aec0df5496c59/master/w_2044,c_limit/bob_esponja_9564.png',
    text: 'Es mi primer post'
  }
];

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  posts: any[];
  loadingPosts: boolean;

  constructor(public tts: TexttospeechService, private router: Router) {
    this.loadingPosts = false;
    this.posts = INFO;
  }

  ngOnInit(): void {
  }

  getEyColor(post: any) {
    if (post.ey) {
      return 'verde';
    } else {
      return 'negro';
    }
  }

  darLike() {
    console.log('Le di like');
  }

  goToProfile(username: string){
    this.router.navigate([`user/${username}`]);
  }

}
