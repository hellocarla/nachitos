import { Areas } from "./areas";
import { Surto } from "./surto";

export interface Recomendacoes {
    _id: string;
    cod_recomendacao: string;
    validade_nota: string;
    cod_zonageo: Areas;
    cod_surto: Surto;
    data_nota: string;
    recomendacao_texto: string;
}