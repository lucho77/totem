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
  selector: 'app-buscarAfil',
  templateUrl: './buscarAfiliado.component.html',
  styleUrls: ['./buscarAfiliado.component.scss']
})
export class BuscarAfiliado implements OnInit{
	doc:string='';
  mensaje:string='';
  display: boolean = false;

  constructor(private reportdefService: ReportdefService, private router: Router) {}
  ngOnInit() {
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
      this.generarMethod();

    }
  }

  private generarMethod( ) {
    const data = {} as ParametrosExecuteMethodRequestDTO;
    // tslint:disable-next-line:prefer-const
    // this.loadSpinner.show();
    data.list = [];
    data.pdf = false;
    data.metodo = FrontEndConstants.METHOD_BUSCAR_COBERTURA;
    data.metodoFinder=true;
    const u = localStorage.getItem('currentUser');

    const g:any = localStorage.getItem('paramGlobal');
    if(u && g){
      const user = JSON.parse(u);
      const global = JSON.parse(g);
      // console.log('data');
      // console.log(data);
      const administ:any = buscarParametro(FrontEndConstants.PARAMETRO_ADMINIST,global);
      const presta:any = buscarParametro(FrontEndConstants.PARAMETRO_PRESTA,global);
      const dni:any = crearParametro(FrontEndConstants.PARAMETRO_NAME,FrontEndConstants.JAVA_LANG_STRING,this.doc);
      data.list.push(administ,presta,dni);
      this.reportdefService.postExecuteMethod(user, data).subscribe
      ((result: ReportMethodResponseDTO) => {
        // this.loadSpinner.hide();
        if(result.dataTableDTO.data.length==0){
          this.mensaje ="El documento ingresado no se encuentra ingresado en nuestra base de datos, pasar por secretaria para ingresar sus datos, muchas gracias ";
          this.display = true;    
            return;
        }
         console.log('result');
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

}
