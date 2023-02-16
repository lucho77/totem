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
    param.entero = true;
    param.name = name;
    param.type  = type;
    param.valueNew = value;
    param.value = value;
    return param;
  }