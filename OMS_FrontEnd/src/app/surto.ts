import { Areas } from "./areas";
import { Virus } from "./virus";

export interface Surto {
    _id: string;
    cod_surto: string;
    cod_virus: Virus;
    cod_zonageo: Areas;
    data_inicio: Date;
    data_fim: Date;
}