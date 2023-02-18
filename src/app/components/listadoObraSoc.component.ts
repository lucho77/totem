import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { FrontEndConstants } from '../constants/frontEndConstants';
import { Data } from '../model/data';
import { Tabular } from '../model/tabular';

@Component({
  selector: 'app-listado-obra',
  templateUrl: './listadoObraSoc.component.html',
  styleUrls: ['./listadoObraSoc.component.scss']
})
export class ListadoObraSoc implements OnInit{
  @Input('data')data!: Data;
  @Output()acciones = new EventEmitter<any>();
  mensaje = "prueba";
  constructor() {}
  
  ngOnInit() {
    console.log(this.data);
  }
  elegirCobertura(id:number){
    console.log(id);
    const d = {} as  Data;
    d.back=false;
    d.from=FrontEndConstants.PANTALLATRES;
    d.data=id;
    this.acciones.emit(d);

  }
  back(){
    const d = {} as  Data;
    d.back=true;
    d.from=FrontEndConstants.PANTALLAUNO;
    this.acciones.emit(d);

  }
}
