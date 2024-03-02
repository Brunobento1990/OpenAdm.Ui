import { IBase } from "./base";

export interface IConfiguracaoDeEmail extends IBase {
    email: string;
    servidor: string;
    senha: string;
    porta: number;
    ativo: boolean;
}