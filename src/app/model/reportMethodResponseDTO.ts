import { Tabular } from "./tabular";

export interface ReportMethodResponseDTO {

     nombre: string;
     typo: string;
     mensaje: string;
    tituloMensaje: string;
    valor: any;
    esObjeto: boolean;
    nameArch: string;
	arch: string;
    dataTableDTO: Tabular;

}
