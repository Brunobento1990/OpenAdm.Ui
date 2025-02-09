import { IBase } from "./base";

export interface IHome {
    topUsuariosTotalCompra: ITopUsuarios[],
    topUsuariosTotalPedido: ITopUsuarios[],
    movimentos: any[],
    faturas: any[],
    totalAReceber: number,
    pedidosEmAberto: number,
    quantidadeDeAcessoEcommerce: number;
    quantidadeDeUsuario: number;
    posicaoDeEstoques: any[]
}

export interface ITopUsuarios extends IBase {
    totalCompra: number,
    totalPedidos: number,
    usuario: string
}