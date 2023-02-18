import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FrontEndConstants } from '../constants/frontEndConstants';
import { Data } from '../model/data';
import { ParametrosExecuteMethodRequestDTO } from '../model/parametrosExecuteMethodRequestDTO';
import { ReportMethodResponseDTO } from '../model/reportMethodResponseDTO';
import { ReportdefService } from '../services/reportdef.service';
import { buscarParametro, crearParametro } from '../util/reporte.util';

@Component({
  selector: 'app-listado-especi',
  templateUrl: './listadoEspeci.component.html',
  styleUrls: ['./listadoEspeci.component.scss']
})
export class ListadoEspeci implements OnInit{
  @Input('data')data!: any;
  @Output()acciones = new EventEmitter<any>();
  list:any;
  mensaje = '';
  display = false;
  constructor(private reportdefService: ReportdefService, private router: Router) {}
  
  ngOnInit() {
    console.log(this.data);
    this.generarMethod();
  }

  private generarMethod( ) {
    const data = {} as ParametrosExecuteMethodRequestDTO;
    // tslint:disable-next-line:prefer-const
    // this.loadSpinner.show();
    data.list = [];
    data.pdf = false;
    data.metodo = FrontEndConstants.METHOD_BUSCAR_ESPECIALIDADES_DEMANDA_ESPONTANEA;
    data.metodoFinder=true;
    const u = localStorage.getItem('currentUser');

    const g:any = localStorage.getItem('paramGlobal');
    if(u && g){
      const user = JSON.parse(u);
      const global = JSON.parse(g);
      // console.log('data');
      // console.log(data);
      const administ:any = buscarParametro(FrontEndConstants.PARAMETRO_ADMINIST,global);
      data.list.push(administ);
      this.reportdefService.postExecuteMethod(user, data).subscribe
      ((result: ReportMethodResponseDTO) => {
        // this.loadSpinner.hide();
        if(result.dataTableDTO.data.length==0){
          this.mensaje ="no se encontraron especialidades disponibles, consulte con un operador  ";
          this.display = true;    
            return;
        }
         console.log('result');
        this.list=result.dataTableDTO.data;
        // console.log(result);
        // console.log('metadata');
        // console.log(metadata);
  
  
          },
       (err: HttpErrorResponse) => {
        this.mensaje ="se ha producido un error al intentar obtener la cobertura, por favor intente nuevamente en unos instantes y si persiste el inconveniente. comuniquese con un operador ";
        this.display = true;    

      });
  
    }else{
      this.router.navigate(['/login']);
      return;
    }

  }
  elegirEspeci(id:number){
    console.log(id);
  }
  back(){
    const d = {} as  Data;
    d.back=true;
    d.from=FrontEndConstants.PANTALLAUNO;
    this.acciones.emit(d);

  }


  private persistirTurno(idEspeci:number ) {
    const data = {} as ParametrosExecuteMethodRequestDTO;
    // tslint:disable-next-line:prefer-const
    // this.loadSpinner.show();
    data.list = [];
    data.pdf = false;
    data.metodo = FrontEndConstants.METHOD_PERSISTIR_TURNO_DEMANDA_ESPONTANEA;
    const u = localStorage.getItem('currentUser');

    const g:any = localStorage.getItem('paramGlobal');
    if(u && g){
      const user = JSON.parse(u);
      const global = JSON.parse(g);
      // console.log('data');
      // console.log(data);
      const administ:any = buscarParametro(FrontEndConstants.PARAMETRO_ADMINIST,global);
      const presta:any = buscarParametro(FrontEndConstants.PARAMETRO_PRESTA,global);
      const especi:any = crearParametro(FrontEndConstants.PARAMETRO_NAME,FrontEndConstants.JAVA_LANG_LONG,idEspeci);
      const afil:any = crearParametro(FrontEndConstants.PARAMETRO_NAME2,FrontEndConstants.JAVA_LANG_LONG,this.data);

      data.list.push(administ);
      data.list.push(presta);
      data.list.push(especi);
      data.list.push(afil);
      this.reportdefService.postExecuteMethod(user, data).subscribe
      ((result: ReportMethodResponseDTO) => {
        // this.loadSpinner.hide();
        if(result.valor){
          this.mensaje ="no se encontraron especialidades disponibles, consulte con un operador  ";
          this.display = true;    
            return;
        }
        // console.log(result);
        // console.log('metadata');
        // console.log(metadata);
  
  
          },
       (err: HttpErrorResponse) => {
        this.mensaje ="se ha producido un error al intentar generar el ticket, consulte con un operador ";
        this.display = true;    

      });
  
    }else{
      this.router.navigate(['/login']);
      return;
    }

  }


}
