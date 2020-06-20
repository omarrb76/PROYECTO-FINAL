import { FeedComponent } from './components/feed/feed.component';
import { NewpostComponent } from './components/newpost/newpost.component';
import { EditComponent } from './components/edit/edit.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { FaqComponent } from './components/faq/faq.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'home', component: LoginComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'user/:username', component: ProfileComponent },
  { path: 'settings', component: ConfiguracionComponent },
  { path: 'edit', component: EditComponent },
  { path: 'newpost', component: NewpostComponent },
  { path: 'feed', component: FeedComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
