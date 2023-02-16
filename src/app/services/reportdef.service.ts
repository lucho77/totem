import { BinarioDTO } from "../model/binarioDTO";
import { DownloadFileRequestDTO } from "../model/downloadFileRequestdto";
import { Tabular } from "../model/tabular";
import { TabularRequestDTO } from "../model/TabularRequestDTO";
import { devolverProyecto } from "../util/proyectoUtil";
import { FormdataReportdef } from '../model/formdata';
import { FormReportdef } from "../model/form";
import { User } from "../model/user";
import { ReportMethodResponseDTO } from "../model/reportMethodResponseDTO";
import { ParamRequestDTO } from "../model/paramRequestDTO";
import { ParamAllRequestDTO } from "../model/paramAllRequestDTO";
import { ObtenerToStringRequestDTO } from "../model/obtenerToStringEntidad";
import { TabularAbmRequestDTO } from "../model/TabularAbmRequestDTO";
import { ParametrosExecuteMethodRequestDTO } from "../model/parametrosExecuteMethodRequestDTO";
import { map } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { ObtenerToStringResponseDTO } from "../model/obtenerToStringEntidadResponse";
import { HttpClient } from "@angular/common/http";


@Injectable({ providedIn: 'root' })
export class ReportdefService {
    constructor(private http: HttpClient) { }

  //  @Path("/dina/obtenerForm/{username}/{datasource}/{idUsuarioUra}/{packageAplication}/{webService}/{reportdef}")

    getObtenerForm(user: User, reportdef: String, global: any, paramForm: any) {
        const datos = {
            username: user.username,
            dataSource: user.datasource,
            token: user.token,
            idUsuarioUra: user.idUsuarioUra,
            webServicesAddress: user.webservice,
            modelPackage: user.packageModel,
            reporte: reportdef,
            idSessionUser: null,
            global: global,
            list: paramForm,
        };
        return this.http.post<FormReportdef>(`${devolverProyecto()}/obtenerForm/`, datos)
        .pipe(map((result:FormReportdef) => result));

    }

    getObtenerFormByClass(user: User, reportdef: String, global: any, paramForm: any) {
        const datos = {
            username: user.username,
            dataSource: user.datasource,
            token: user.token,
            idUsuarioUra: user.idUsuarioUra,
            webServicesAddress: user.webservice,
            modelPackage: user.packageModel,
            reporte: reportdef,
            idSessionUser: null,
            global: global,
            list: paramForm,
            aplicacion: user.aplicacion
        };
        return this.http.post<FormReportdef>(`${devolverProyecto()}/getFormByClassName/`, datos)
        .pipe(map((result:FormReportdef) => result));

    }



    getObtenerTabular( datos: TabularRequestDTO) {
        return this.http.post<Tabular>(`${devolverProyecto()}/obtenerTabular/`, datos)
        .pipe(map((data: Tabular) => data));
    }
    getObtenerTabularByMethod( datos: TabularRequestDTO) {
        return this.http.post<Tabular>(`${devolverProyecto()}/obtenerTabularByMethod/`, datos)
        .pipe(map((data: Tabular) => data));
    }
    getObtenerTabularAbm(datos: TabularAbmRequestDTO) {
        return this.http.post<Tabular>(`${devolverProyecto()}/obtenerTabularAbmNew/`, datos)
        .pipe(map((data: Tabular) => data));
    }
    postExecuteMethod(user: User, datos: ParametrosExecuteMethodRequestDTO) {
        datos.username = user.username;
        datos.dataSource = user.datasource;
        datos.webServicesAddress = user.webservice;
        datos.modelPackage = user.packageModel;
        datos.idUsuarioUra = user.idUsuarioUra;
        return this.http.post<ReportMethodResponseDTO>(`${devolverProyecto()}/ejecutarMetodo/`, datos)
        .pipe(map((result:ReportMethodResponseDTO) => result));
    }
    consultarParamByName(user: User, datos: ParamRequestDTO) {
        datos.username = user.username;
        datos.dataSource = user.datasource;
        datos.webServicesAddress = user.webservice;
        datos.modelPackage = user.packageModel;
        datos.idUsuarioUra = user.idUsuarioUra;
        return this.http.post<FormdataReportdef>(`${devolverProyecto()}/consultarParametroByName/`, datos)
        .pipe(map((data: FormdataReportdef) => data));
    }
    consultarAllParamByName(user: User, datos: ParamAllRequestDTO) {
        datos.username = user.username;
        datos.dataSource = user.datasource;
        datos.webServicesAddress = user.webservice;
        datos.modelPackage = user.packageModel;
        datos.idUsuarioUra = user.idUsuarioUra;
        return this.http.post<FormdataReportdef[]>(`${devolverProyecto()}/consultarAllParametrosByName/`, datos)
        .pipe(map((data: FormdataReportdef[]) => data));
    }
    consultarToStringEntidad(user: User, datos: ObtenerToStringRequestDTO) {
        datos.username = user.username;
        datos.dataSource = user.datasource;
        datos.webServicesAddress = user.webservice;
        datos.modelPackage = user.packageModel;
        datos.idUsuarioUra = user.idUsuarioUra;
        console.log('datos');
        console.log(datos);
        return this.http.post<ObtenerToStringResponseDTO>(`${devolverProyecto()}/obtenerToStringEntidad/`, datos)
        .pipe(map((data: ObtenerToStringResponseDTO) => data));
    }
    downloadFile(user: User, datos: DownloadFileRequestDTO) {
        datos.username = user.username;
        datos.dataSource = user.datasource;
        datos.webServicesAddress = user.webservice;
        datos.modelPackage = user.packageModel;
        datos.idUsuarioUra = user.idUsuarioUra;
        return this.http.post<BinarioDTO>(`${devolverProyecto()}/downloadFile/`, datos)
        .pipe(map((data: BinarioDTO) => data));
    }

    consultarParametroByClase(user: User, datos: ParamRequestDTO) {
        datos.username = user.username;
        datos.dataSource = user.datasource;
        datos.webServicesAddress = user.webservice;
        datos.modelPackage = user.packageModel;
        datos.idUsuarioUra = user.idUsuarioUra;
        return this.http.post<FormdataReportdef>(`${devolverProyecto()}/consultarParametroByClase/`, datos)
        .pipe(map((data: FormdataReportdef) => data));
    }

}
