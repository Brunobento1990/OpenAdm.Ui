import { IBase } from "./base";

export interface IConfiguracaoDePedido extends IBase {
    emailDeEnvio: string;
    ativo: boolean;
    logo?: string;
    pedidoMinimoAtacado?: number | string;
    pedidoMinimoVarejo?: number | string;
    whatsApp?: string;
    vendaDeProdutoComEstoque?: boolean;
}