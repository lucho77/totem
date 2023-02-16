import { FormdataReportdef } from './formdata';
import { MetodoDTO } from './metodoDTO';

export interface FormReportdef {
   visualizacion: string;
   list: FormdataReportdef[];
   labelDescripcion: string;
   camposAgrupados: string;
   tabs: boolean;
   formMetodo: boolean;
   parametro: FormdataReportdef;
   metodoDTOs: MetodoDTO[];
   dinamycForm: boolean;

}
