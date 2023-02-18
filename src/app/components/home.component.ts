import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { FrontEndConstants } from '../constants/frontEndConstants';
import { FormdataReportdef } from '../model/formdata';
import { ParametrosExecuteMethodRequestDTO } from '../model/parametrosExecuteMethodRequestDTO';
import { ReportMethodResponseDTO } from '../model/reportMethodResponseDTO';
import { ReportdefService } from '../services/reportdef.service';
import { buscarParametro, crearParametro } from '../util/reporte.util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
   form : any = {
    buscarAfiliado:true,
    listadoOS:false,
    listadoEs:false,
    listadoTurnos:false,
    data:{}
  }
  constructor() {}
  ngOnInit() {
  }
  proceesAction(data:any){
    if(!data.back){

      switch(data.from) { 
        case FrontEndConstants.PANTALLADOS: { 
          //statements;
          this.form.buscarAfiliado=false; 
          this.form.listadoEs=false;         
          this.form.listadoOS=true; 
          this.form.listadoTurnos=false; 
          this.form.data = data;
          break; 
       } 
       case FrontEndConstants.PANTALLATRES: { 
        //statements;
        this.form.buscarAfiliado=false; 
        this.form.listadoOS=false; 
        this.form.listadoTurnos=true; 
        this.form.listadoEs=false;         
        this.form.data = data;
        break; 
     } 
     case FrontEndConstants.PANTALLACUATRO: { 
      //statements;
      this.form.buscarAfiliado=false; 
      this.form.listadoOS=false; 
      this.form.listadoEs=true;
      this.form.listadoTurnos=false;          
      this.form.data = data;
      break; 
   } 
} 

    }else{
      switch(data.from) { 
        case FrontEndConstants.PANTALLAUNO: { 
          //statements;
          this.form.buscarAfiliado=true; 
          this.form.listadoTurnos=false; 
          this.form.listadoOS=false; 
          this.form.listadoEs=false;         
          this.form.data = data;
          break; 
       } 
       case FrontEndConstants.PANTALLATRES: { 
        //statements;
        this.form.buscarAfiliado=true; 
        this.form.listadoTurnos=false; 
        this.form.listadoOS=false; 
        this.form.listadoEs=false;         
        this.form.data = data;
        break; 
     } 
 } 

    }  
  }

}
