import { IBase } from "./base";

export interface IConfiguracaoPagamentoMercadoPago extends IBase {
    publicKey: string;
    accessToken: string;
    cobraCpf?: boolean;
    cobraCnpj?: boolean;
}