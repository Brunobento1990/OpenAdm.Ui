import { IBase } from "./base";

export interface IConfiguracaoDePedido extends IBase {
    emailDeEnvio: string;
    ativo: boolean;
    logo?: string;
}