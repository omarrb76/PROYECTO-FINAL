import { SnackbarService } from './snackbar.service';
import { TexttospeechService } from './texttospeech.service';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  user: User;

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    private auth2: AngularFireAuth,
    private tts: TexttospeechService,
    private snackBarService: SnackbarService
  ) {
    this.cerrarSesionAdmin();
  }

  getPersonalInfo(email: string) {
    const query = this.db.collection<User>('users', ref => ref.where('email', '==', email));
    return query.valueChanges();
  }

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

  emailPasswdLoginAdmin(correo: string, passwd: string) {
    return this.auth2.signInWithEmailAndPassword(correo, passwd);
  }

  getUsuarioConectado() {
    return this.auth.user;
  }

  logout() {
    this.auth.signOut();
  }

  agregarUsuario(user: User, pass: string) {
    this.db.collection('users').doc(user.username).set(user)
      .catch(err => {
        const errorCode = err.code;
        const errorMessage = err.message;
        console.error(errorCode, errorMessage);
        alert('Error al grabar en la base de datos');
      });

    this.db.collection('admin').doc(user.username).set({
      username: user.username,
      password: pass,
      email: user.email
    }).catch(err => {
      const errorCode = err.code;
      const errorMessage = err.message;
      console.error(errorCode, errorMessage);
      alert('Error al grabar en la base de datos');
    });
  }

  cargarUsuarios() {
    const query = this.db.collection<User>('users',
      ref => ref.orderBy('date', 'asc'));
    return query.valueChanges({ idField: 'idDB' });
  }

  setUser(user: User) {
    this.user = user;
  }

  getUser(): User {
    return this.user;
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

  crearNuevoUsuarioAdmin(user: User, password: string) {
    return this.auth2.createUserWithEmailAndPassword(user.email, password);
  }

  cerrarSesionAdmin() {
    this.auth2.signOut();
  }

  borrarUsuario(id: string) {

    this.getContraseña(id).subscribe((data: any) => {
      console.log(data);
      if (data) {
        const pass_aux = data[0].password;
        const email = data[0].email;
        this.emailPasswdLoginAdmin(email, pass_aux).then(res => {
          this.auth2.currentUser.then((usr) => {
            usr.delete();
          });
        });

        this.db.collection('users').doc(id).delete().then(res => {
          this.snackBarService.openSnackBar('El usuario: ' + id + ' ha sido borrado exitosamente', 'Aceptar');
          this.tts.play('El usuario: ' + id + ' ha sido borrado exitosamente');
        });

        this.db.collection('admin').doc(id).delete();
      }
    });
  }

  getContraseña(username: string) {
    return this.db.collection<User>('admin', ref => ref.where('username', '==', username)).valueChanges();
  }

}
