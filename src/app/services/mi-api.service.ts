import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

// Esta es la clase con las peticiones de NUESTRA API
export class MiApiService {

  constructor(private httpClient: HttpClient) {}

  sendEmail(formulario: any){
    return this.httpClient.post('http://localhost:3000/email', formulario);
  }

}
