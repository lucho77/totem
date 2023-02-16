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
    listadoOS:false
  }
  constructor() {}
  ngOnInit() {
  }
}
