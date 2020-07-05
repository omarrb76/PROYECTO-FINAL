import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

// Esta es la clase con las peticiones de NUESTRA API
export class MiApiService {

  constructor(private httpClient: HttpClient) {}

  // ruta = 'https://proy-isc-6a-2020.web.app';
  ruta = 'http://localhost:5000';

  sendEmail(formulario: any){
    return this.httpClient.post(this.ruta + '/api/email', formulario);
  }

}
