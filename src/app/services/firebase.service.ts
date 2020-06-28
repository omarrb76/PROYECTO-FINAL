import { SnackbarService } from './snackbar.service';
import { TexttospeechService } from './texttospeech.service';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  user: User;

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    private tts: TexttospeechService,
    private snackBarService: SnackbarService
  ) { }

  setUser(user: User) { this.user = user; }
  getUser(): User { return this.user; }
  getUsuarioConectado() { return this.auth.user; }
  logout() { this.auth.signOut(); }

  getUserDB(username: string) {
    const query = this.db.collection<User>('users', ref => ref.where('username', '==', username));
    return query.valueChanges();
  }

  crearNuevoUsuario(user: User, password: string) {
    return this.auth.createUserWithEmailAndPassword(user.email, password);
  }

  emailPasswdLogin(correo: string, passwd: string) {
    return this.auth.signInWithEmailAndPassword(correo, passwd);
  }

  agregarUsuario(user: User) {
    this.db.collection('users').doc(user.username).set(user)
      .then(exito => {
        window.location.reload();
      })
      .catch(err => {
        const errorCode = err.code;
        const errorMessage = err.message;
        console.error(errorCode, errorMessage);
        alert('Error al grabar en la base de datos');
        this.snackBarService.openSnackBar('Error al grabar en la base de datos', 'Aceptar');
        this.tts.play('Error al grabar en la base de datos');
      });
  }

  cargarUsuarios() {
    const query = this.db.collection<User>('users',
      ref => ref.orderBy('date', 'asc'));
    return query.valueChanges();
  }

  actualizarSeguidores(user1: User, user2: User) {
    this.actualizarUsuario(user1);
    this.actualizarUsuario(user2);
  }

  actualizarUsuario(user: User) {
    this.db.collection('users').doc(user.username).update(user);
  }

  async updateUser(user: User, passwordNew: string, passwordOld: string) {

    let aux = false;

    await this.emailPasswdLogin(user.email, passwordOld)
      .then(res => {
        this.auth.currentUser.then((usr) => {
          usr.updatePassword(passwordNew);
          aux = true;
        });

        this.db.collection('users').doc(user.username).update({
          name: user.name,
          picture: user.picture
        });
      })
      .catch(err => {
        const errorCode = err.code;
        const errorMessage = err.message;

        this.snackBarService.openSnackBar('La contraseña anterior ingresada es incorrecta', 'Aceptar');
        this.tts.play('La contraseña anterior ingresada es incorrecta');
      });

    return new Promise((resolve: any, reject) => {
      resolve(aux);
    });
  }

  crearNuevoPost(post: Post) {
    return this.db.collection('users').doc(post.username).collection('posts').doc(post.date.toString()).set(post);
  }

  async getAllPosts(users: string[]) {

    users.push(this.user.username);

    const posts: Post[] = [];

    for (const user of users) {
      await this.getUserPosts(user).toPromise().then(res => {
        res.forEach(doc => {
          const post: Post = {
            username: doc.data().username,
            date: doc.data().date.toDate(),
            text: doc.data().text,
            image: doc.data().image,
            likes: doc.data().likes
          };
          posts.push(post);
        });
      });
    }

    posts.sort((a, b) => {
      if (a.date > b.date){
        return -1;
      } else if (a.date < b.date){
        return 1;
      } else {
        return 0;
      }
    });

    return new Promise((resolve, reject) => {
      resolve(posts);
    });
  }

  getUserPosts(username: string) {
    const query = this.db.collection('users').doc(username).collection<Post>('posts', ref => ref.orderBy('date', 'desc'));
    return query.get();
  }

  async getProfilePictures(users){
    const pictures: any[] = [];
    for (const user of users) {
      await this.getProfilePicture(user).toPromise().then(res => {
        res.forEach(doc => pictures.push({username: user, picture: doc.data().picture}));
      });
    }
    console.log(pictures);
    return new Promise((resolve, reject) => {
      resolve(pictures);
    });
  }

  private getProfilePicture(username: string){
    const query = this.db.collection('users', ref => ref.where('username', '==', username));
    return query.get();
  }

}
