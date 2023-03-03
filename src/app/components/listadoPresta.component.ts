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
declare function print(texto:string): any;

@Component({
  selector: 'app-listado-presta',
  templateUrl: './listadoPresta.component.html',
  styleUrls: ['./listadoPresta.component.scss']
})
export class ListadoPresta implements OnInit{
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
    const u = localStorage.getItem('currentUser');
    const list:any =[];
    const g:any = localStorage.getItem('paramGlobal');
    if(u && g){
      const user = JSON.parse(u);
      const global = JSON.parse(g);
      // console.log('data');
      // console.log(data);
      const contenido:any = crearParametro(FrontEndConstants.PARAMETRO_NAME,FrontEndConstants.JAVA_LANG_STRING,"");
      const administ:any = buscarParametro(FrontEndConstants.PARAMETRO_ADMINIST,global);
      list.push(contenido);
      const paramRequest = {} as ParamRequestDTO;
              paramRequest.nombre = FrontEndConstants.PARAMETRO_ESPECI;
              this.reportdefService.consultarParamByName(user, paramRequest).subscribe
              ((p: FormdataReportdef) => {
                p.valueNew = parseInt(this.data.data);
                p.value = parseInt(this.data.data);
                list.push(p);
                list.push(administ);
                this.buscarPrestadores(user,list);
                },
                 (err: HttpErrorResponse) => {
                  this.mensaje ="se ha producido un error al intentar obtener datos del servidor, por favor intente nuevamente en unos instantes y si persiste el inconveniente. comuniquese con un operador ";
                  this.display = true;    
            
                });

    }else{
      this.router.navigate(['/login']);
      return;

    }
  }
  buscarPrestadores(user:any,list:any){

    const data = {} as ParametrosExecuteMethodRequestDTO;
    // tslint:disable-next-line:prefer-const
    // this.loadSpinner.show();
    data.list = list;
    data.pdf = false;
    data.metodo = FrontEndConstants.METHOD_BUSCAR_PRESTADOR_ESPECIALIDAD;
    data.metodoFinder=true;

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


  }

  elegirPresta(id:number){
    console.log(id);
    this.persistirTurno(id);
  }
  back(){
    const d = {} as  Data;
    d.back=true;
    d.from=FrontEndConstants.PANTALLAUNO;
    this.acciones.emit(d);

  }


  private persistirTurno(idPresta:number ) {
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
      const du:any = localStorage.getItem('dataTurno');
      const dt = JSON.parse(du);
      const administ:any = buscarParametro(FrontEndConstants.PARAMETRO_ADMINIST,global);
      const presta:any = crearParametro(FrontEndConstants.PARAMETRO_NAME,FrontEndConstants.JAVA_LANG_LONG,idPresta);
      const afil:any = crearParametro(FrontEndConstants.PARAMETRO_NAME2,FrontEndConstants.JAVA_LANG_LONG,dt.data);

      data.list.push(administ);
      data.list.push(presta);
      data.list.push(afil);
      this.reportdefService.postExecuteMethod(user, data).subscribe
      ((result: ReportMethodResponseDTO) => {
        // this.loadSpinner.hide();
        print(result.valor);
        this.router.navigate(['/login']);
  
          },
       (err: HttpErrorResponse) => {
        this.mensaje = err.error.mensaje;
        this.display = true;    

      });
  
    }else{
      this.router.navigate(['/login']);
      return;
    }

  }
  backAnt(){
    const d = {} as  Data;
    d.back=true;
    d.from=FrontEndConstants.PANTALLACUATRO;
    const du:any = localStorage.getItem('dataEspeci');
    if(du ){
      const dt = JSON.parse(du);
      d.data = dt.data;
    }

    this.acciones.emit(d);

  }


}
