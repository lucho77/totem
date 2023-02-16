import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  msgError = ''

  constructor(private authenticationService: AuthenticationService,private router: Router){

  }

  ngOnInit(): void {
    this.login();

  } 

  async login() {
    const user:any = await this.connect();
    this.router.navigate(['/home']);

  }

  connect() {

  return new Promise(resolve => {
  this.authenticationService.login(environment.user, environment.password, 
  true).subscribe
  (user => {

    if (user.errorBusiness) {
                   // es un error
                   console.log('ERRORRRRRRRRRRRRRRRRRRR');
                   console.log('error metodo login');
                   this.msgError = 'NO SE PUEDE ESTABLECER CONEXION CON EL SERVIDOR';
                  return;
               }
               // this.loadSpinner = false;
               localStorage.setItem('currentUser', JSON.stringify(user));
               localStorage.setItem('paramGlobal', JSON.stringify(user.listGlobales));
             
               // this.cargarChat(user);
                resolve(user);

  },
  (err: HttpErrorResponse) => {
    console.log('error metodo login');
    console.log(err);
      this.msgError = 'NO SE PUEDE ESTABLECER CONEXION CON EL SERVIDOR';
      return;

    }
  );
});
}

}
