import { IBase } from "./base";

export interface IBanner extends IBase {
    foto: string;
    novaFoto?: string;
    ativo: boolean
}