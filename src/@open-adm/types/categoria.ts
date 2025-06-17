import { IBase } from "./base";

export interface ICategoria extends IBase {
    foto?: string;
    novaFoto?: string;
    descricao: string;
    inativoEcommerce?: boolean
}