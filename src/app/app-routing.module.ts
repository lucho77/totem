import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectComponent } from './components/connect.component';
import { HomeComponent } from './components/home.component';
import { LoginComponent } from './components/login.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'connect/:usuario/:pass/:idGrupReal', component: ConnectComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
