import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  user: User;

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) { }

  getPersonalInfo(email: string) {
    const query = this.db.collection<User>('users', ref => ref.where('email', '==', email));
    return query.valueChanges();
  }

  getUserDB(username: string){
    const query = this.db.collection<User>('users', ref => ref.where('username', '==', username));
    return query.valueChanges();
  }

  crearNuevoUsuario(user: User, password: string) {
    return this.auth.createUserWithEmailAndPassword(user.email, password);
  }

  emailPasswdLogin(correo: string, passwd: string) {
    return this.auth.signInWithEmailAndPassword(correo, passwd);
  }

  getUsuarioConectado() {
    return this.auth.user;
  }

  logout() {
    this.auth.signOut();
  }

  agregarUsuario(user: User) {
    this.db.collection('users').add(user).catch(err => {
      const errorCode = err.code;
      const errorMessage = err.message;
      console.error(errorCode, errorMessage);
      alert('Error al grabar en la base de datos');
    });
  }

  cargarUsuarios() {
    const query = this.db.collection<User>('users',
      ref => ref.orderBy('date', 'asc'));
    return query.valueChanges();
  }

  setUser(user: User) {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }

}
