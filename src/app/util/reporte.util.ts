import { FrontEndConstants } from "../constants/frontEndConstants";
import { FormdataReportdef } from "../model/formdata";

export function buscarParametro( parametro:  string, globales: FormdataReportdef[] ) {
    for (const g of globales) {
        console.log(g);
        if (parametro === g.name) {
            return g;
        }
    }
    return null;
  }

  export function crearParametro(name: string, type: string, value: any) {

    const param = {} as  FormdataReportdef;
    if(type===FrontEndConstants.JAVA_LANG_STRING){
      param.text = true;
    }else if (type===FrontEndConstants.JAVA_LANG_LONG){
      param.entero = true;
    }
    param.name = name;
    param.type  = type;
    param.valueNew = value;
    param.value = value;
    return param;
  }