import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Articulo} from './../models/articulo.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) { }

  async crearNuevoUsuario(nombre: string, correo: string, passwd: string) {
    let exito: boolean;
    await this.auth.createUserWithEmailAndPassword(correo, passwd)
      .then((usrCred: firebase.auth.UserCredential) => {
        console.log(usrCred);
        usrCred.user.updateProfile({ displayName: nombre });
        exito = true;
      })
      .catch((err: any) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        alert(errorMessage);
        console.error(errorCode, errorMessage);
        exito = false;
      });

    if (exito) {
      console.log('Exito!!');
      alert('Usuario creado! Se inicio sesion.');
    }
  }

  emailPasswdLogin(correo: string, passwd: string) {
    this.auth.signInWithEmailAndPassword(correo, passwd)
      .then((usr: any) => {
        console.log(usr);
      })
      .catch((err: any) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        alert(errorMessage);
        console.error(errorCode, errorMessage);
      });
  }

  getUsuarioConectado() {
    return this.auth.user;
  }

  logout() {
    this.auth.signOut();
  }

  agregarArticulo(obj: Articulo) {
    this.db.collection('articulos').add({
      nombre: obj.nombre,
      cantidad: parseInt(obj.cantidad, 10),
      color: obj.color,
    }).catch(err => {
      const errorCode = err.code;
      const errorMessage = err.message;
      console.error(errorCode, errorMessage);
      alert('Error al grabar en la base de datos');
    });
  }

  cargarArticulos() {
    const query = this.db.collection<Articulo>('articulos',
      ref => ref.orderBy('cantidad', 'asc').limit(10));
    return query.valueChanges();
  }

}
