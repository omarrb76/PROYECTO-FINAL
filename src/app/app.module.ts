import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { FaqComponent } from './components/faq/faq.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HeaderComponent } from './components/header/header.component';
import { TexttospeechComponent } from './components/texttospeech/texttospeech.component';
import { TtsdialogComponent } from './components/ttsdialog/ttsdialog.component';
import { FeedComponent } from './components/feed/feed.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotificationsdialogComponent } from './components/notificationsdialog/notificationsdialog.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { EditComponent } from './components/edit/edit.component';
import { NewpostbuttonComponent } from './components/newpostbutton/newpostbutton.component';
import { NewpostComponent } from './components/newpost/newpost.component';
import { DomseguroPipe } from './pipes/domseguro.pipe';
import { HttpClientModule } from '@angular/common/http';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { TablaUsuariosComponent } from './admin/tabla-usuarios/tabla-usuarios.component';

// Imports de Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFireStorageModule,
  AngularFireStorageReference,
  AngularFireUploadTask
} from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { PostsComponent } from './components/posts/posts.component';

// Imports de código QR
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

// Import para gráficas
import { ChartsModule } from 'ng2-charts';
import { AdminGraficasComponent } from './admin/admin-graficas/admin-graficas.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    FaqComponent,
    AboutComponent,
    ContactComponent,
    HeaderComponent,
    TexttospeechComponent,
    TtsdialogComponent,
    FeedComponent,
    NavbarComponent,
    NotificationsdialogComponent,
    ProfileComponent,
    ConfiguracionComponent,
    EditComponent,
    NewpostbuttonComponent,
    NewpostComponent,
    DomseguroPipe,
    AdminHomeComponent,
    TablaUsuariosComponent,
    PostsComponent,
    AdminGraficasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    NgxQRCodeModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
