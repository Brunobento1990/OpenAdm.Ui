import { IBase } from "./base";

export interface IConfiguracaoPagamentoMercadoPago extends IBase {
    publicKey: string;
    accessToken: string;
}