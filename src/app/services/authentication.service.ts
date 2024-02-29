import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { devolverProyecto } from '../util/proyectoUtil';
import { ParametrosGlobalesDTO } from '../model/parametrosGlobalesDTO';
import { Observable } from 'rxjs';
import { RefreshTokenResponse } from '../model/refreshTokenResponse';
import { RefreshToken } from '../model/refreshToken';
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    menu: any = [];
    parametroGlobales: any = [];
    constructor(private http: HttpClient) { }
    login(username: string, password: string, novalidahabilitado:boolean) {
        console.log('Permitido en el Authentication service');
        return this.http.get<any>(`${devolverProyecto()}/loginSimple/${username}/${password}/configura/${novalidahabilitado}`);
    }
    version() {
        console.log('obteniendo version Server');
        return this.http.get<any>(`${devolverProyecto()}/versionServer/`);
    }
    getParametrosGlobales( username: string, datasource: string, idUsuarioUra: number, packageAplication: string) {
        console.log('obtener parametros globales  ');
        // tslint:disable-next-line:max-line-length
        this.parametroGlobales = this.http.get<ParametrosGlobalesDTO>(`${devolverProyecto()}/obtenerParametrosGlobales/${username}/${datasource}/${idUsuarioUra}/${packageAplication}`);
        return this.parametroGlobales;
    }
    refreshToken(user:any) : Observable<RefreshTokenResponse>{
        let data = new RefreshToken; 
        data.username = user.username;
        data.tokenExpired = user.token;
        data.refreshToken = user.refreshToken;
        data.idUsuarioUra = user.idUsuarioUra;
        return this.http.post<RefreshTokenResponse>(`${devolverProyecto()}/refreshToken/`,data);
    }


}
