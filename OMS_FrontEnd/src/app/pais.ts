import { Areas } from "./areas";

export interface Pais {
    _id: string;
    cod_pais: string;
    nome_pais: string;
    cod_zonageo: Areas;
}