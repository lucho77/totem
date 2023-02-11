import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
	doc:string='';
  mensaje:string='';
  display: boolean = false;

  constructor(private primengConfig: PrimeNGConfig) {}
  ngOnInit() {
      this.primengConfig.ripple = true;
  }
  writeNro(nro:string){
    this.doc+=nro;
  }
  eraseNro(){
    this.doc=this.doc?this.doc.substring(0,this.doc.length-1):'';
  }
  verificarCobertura(){
    if(this.doc =='' || this.doc.length <6  ){
      this.mensaje = "debe ingresar un Nro de DNI válido";
    }else{
      this.mensaje ="El documento ingresado no se encuentra ingresado en nuestra base de datos, pasar por secretaria para ingresar sus datos, muchas gracias ";
    }
    this.display = true;    
  }
}
