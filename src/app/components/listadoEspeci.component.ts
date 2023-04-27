import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FrontEndConstants } from '../constants/frontEndConstants';
import { Data } from '../model/data';
import { FormdataReportdef } from '../model/formdata';
import { ParametrosExecuteMethodRequestDTO } from '../model/parametrosExecuteMethodRequestDTO';
import { ParamRequestDTO } from '../model/paramRequestDTO';
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
    if(!this.data.back){
      localStorage.setItem('dataEspeci', JSON.stringify(this.data));
    }

    this.generarMethod();
  }

  private async generarMethod( ) {
    const data = {} as ParametrosExecuteMethodRequestDTO;
    // tslint:disable-next-line:prefer-const
    // this.loadSpinner.show();
    data.list = [];
    data.pdf = false;
    data.metodo = FrontEndConstants.METHOD_BUSCAR_ESPECIALIDADES_DEMANDA_ESPONTANEA;
    data.metodoFinder=true;
    const u = localStorage.getItem('currentUser');

    const g:any = localStorage.getItem('paramGlobal');
    const l:any = localStorage.getItem('login');
    if(u && g){
      const user = JSON.parse(u);
      const global = JSON.parse(g);
      const login = JSON.parse(l);
      // console.log('data');
      // console.log(data);
      const administ:any = buscarParametro(FrontEndConstants.PARAMETRO_ADMINIST,global);
      const grupReal:any = await this.buscarParamGrupReal(user,login.idGrupReal);




      data.list.push(administ);
      data.list.push(grupReal);
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
    const d = {} as  Data;
    d.back=false;
    d.from=FrontEndConstants.PANTALLACINCO;
    d.data = id;
    this.acciones.emit(d);
  }
  back(){
    const d = {} as  Data;
    d.back=true;
    d.from=FrontEndConstants.PANTALLAUNO;
    this.acciones.emit(d);

  }
  backAnt(){
    const d = {} as  Data;
    d.back=true;
    d.from=FrontEndConstants.PANTALLATRES;
    const du:any = localStorage.getItem('dataTurno');
    if(du ){
      const dt = JSON.parse(du);
      d.data = dt.data;
    }

    this.acciones.emit(d);

  }

 buscarParamGrupReal(user:any, id:number){
  return new Promise(resolve => {
    const paramRequest = {} as ParamRequestDTO;
    paramRequest.nombre = FrontEndConstants.PARAMETRO_GRUPREAL;
    this.reportdefService.consultarParamByName(user, paramRequest).subscribe
    ((p: FormdataReportdef) => {
      p.valueNew = id;
      p.value = id;
      localStorage.setItem("grupReal",JSON.stringify(p));

      resolve(p);
    },
      (err: HttpErrorResponse) => {
        this.mensaje ="se ha producido un error al intentar obtener el parametro grupreal ";
        this.display = true;
        return;                
      });


  });




}


}
