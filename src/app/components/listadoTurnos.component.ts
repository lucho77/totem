import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { FrontEndConstants } from '../constants/frontEndConstants';
import { Data } from '../model/data';
import { FormdataReportdef } from '../model/formdata';
import { ParamRequestDTO } from '../model/paramRequestDTO';
import { Tabular } from '../model/tabular';
import { TabularRequestDTO } from '../model/TabularRequestDTO';
import { User } from '../model/user';
import { ReportdefService } from '../services/reportdef.service';
import * as moment from 'moment';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { ParametrosExecuteMethodRequestDTO } from '../model/parametrosExecuteMethodRequestDTO';
import { ReportMethodResponseDTO } from '../model/reportMethodResponseDTO';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-listadoTurnos',
  templateUrl: './listadoTurnos.component.html',
  styleUrls: ['./listadoTurnos.component.scss'],
  providers: [ConfirmationService]
})
export class ListadoTurnos implements OnInit{
  @Output()acciones = new EventEmitter<any>();
  @Input('data')data!: any;
  list:any;
  mensaje:string='';
  display: boolean = false;
  tieneTurnos = false;
  fday = moment().format('DD-MM-YYYY');
  constructor(private reportdefService: ReportdefService, private router: Router,private confirmationService: ConfirmationService) {}
  ngOnInit() {
    this.cargarTurnos();
  }
  private generateTabularRequestDTO(data: TabularRequestDTO, user: User, g: any , reportdef: string,
    desde: number, hasta: number, vista: string, listRequest: FormdataReportdef[]) {
     
      data.desde = desde;
      data.hasta = hasta;
      data.username = user.username;
      data.dataSource = user.datasource;
      data.modelPackage = user.packageModel;
      data.idUsuarioUra = user.idUsuarioUra;
      data.webServicesAddress = user.webservice;
      data.reportdef = reportdef;
      data.vista = vista;
      data.global = g;
      data.list = listRequest;
    
  }
  imprimir(){
    
  }
  cargarTurnos(){

    const u = localStorage.getItem('currentUser');

    const g:any = localStorage.getItem('paramGlobal');
    if(u && g){
      const user = JSON.parse(u);
      const global = JSON.parse(g);
      const data = {} as TabularRequestDTO;
      // tslint:disable-next-line:prefer-const
      data.list = [];

  
      const paramRequest = {} as ParamRequestDTO;
              paramRequest.nombre = FrontEndConstants.PARAMETRO_AFILIADO;
              this.reportdefService.consultarParamByName(user, paramRequest).subscribe
              ((p: FormdataReportdef) => {
                p.valueNew = this.data.data;
                p.value = this.data.data;
                data.list.push(p);
                this.buscarTurnos(data.list,user,global);
              },
               (err: HttpErrorResponse) => {
                this.display = true;
                this.mensaje = "se ha producido un error al intentar obtener informacion del servidor, comuniquese con un operador";
           });
  
  

    }else{
      this.router.navigate(['/login']);
      return;
    }
   


    
  }
  buscarTurnos(list:any, user:any,globales:any){
    const data = {} as TabularRequestDTO;

    this.generateTabularRequestDTO(data, user,globales,FrontEndConstants.REPORTE_TURNOS_CANCELAR_DAR_PRESENTE , 0, 200, '', list);
    // console.log('this.listRequest');
    // console.log(this.listRequest);  
    this.reportdefService.getObtenerTabular(data).subscribe
    ((m: Tabular) => {
          console.log(m);
          this.list=m;
        },
     (err: HttpErrorResponse) => {
      this.display = true;
      this.mensaje = "se ha producido un error al intentar obtener informacion del servidor, comuniquese con un operador";
});

  }

  back(){
    const d = {} as  Data;
    d.back=true;
    d.from=FrontEndConstants.PANTALLATRES;
    this.acciones.emit(d);

  }
  
  confirm(id:number) {
    this.confirmationService.confirm({
        message: 'Esta seguro de cancelar el turno?',
        acceptLabel:"Si",
        accept: () => {
           this.cancelarTurno(id);
        }
    });
}

private cancelarTurno( id:number) {
  const data = {} as ParametrosExecuteMethodRequestDTO;
  // tslint:disable-next-line:prefer-const
  // this.loadSpinner.show();
  data.list = [];
  data.pdf = false;
  data.metodo = FrontEndConstants.METHOD_CANCELAR_TURNO;
  const u = localStorage.getItem('currentUser');

  const g:any = localStorage.getItem('paramGlobal');
  if(u && g){
    const user = JSON.parse(u);
    const global = JSON.parse(g);
    // console.log('data');
    // console.log(data);

    data.list = [];

  
    const paramRequest = {} as ParamRequestDTO;
            paramRequest.nombre = FrontEndConstants.PARAMETRO_TURNOGRAL;
            this.reportdefService.consultarParamByName(user, paramRequest).subscribe
            ((p: FormdataReportdef) => {
              p.valueNew = id;
              p.value = id;
              data.list.push(p);
              this.reportdefService.postExecuteMethod(user, data).subscribe
              ((result: ReportMethodResponseDTO) => {
                // this.loadSpinner.hide();
                 console.log('se ha eliminado el turno correctamente');
                 this.list.data = this.list.data.filter((item: { value: number; }[]) => item[1].value !== id);

                // console.log(result);
                // console.log('metadata');
                // console.log(metadata);
          
          
                  },
               (err: HttpErrorResponse) => {
                this.mensaje ="se ha producido un error al intentar obtener la cobertura, por favor intente nuevamente en unos instantes y si persiste el inconveniente. comuniquese con un operador ";
                this.display = true;    
          
              });
          
            },
             (err: HttpErrorResponse) => {
              this.display = true;
              this.mensaje = "se ha producido un error al intentar obtener informacion del servidor, comuniquese con un operador";
         });

  }else{
    this.router.navigate(['/login']);
    return;
  }

}
}
function ViewChild(arg0: string) {
  throw new Error('Function not implemented.');
}

