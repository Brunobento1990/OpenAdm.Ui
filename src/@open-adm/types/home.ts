import { IBase } from "./base";

export interface IHome {
    topUsuariosTotalCompra: ITopUsuarios[],
    topUsuariosTotalPedido: ITopUsuarios[],
    movimentos: any[],
    faturas: any[],
    totalAReceber: number,
    pedidosEmAberto: number,
    quantidadeDeAcessoEcommerce: number;
    quantidadeDeUsuarioCpf: number;
    quantidadeDeUsuarioCnpj: number;
    posicaoDeEstoques: any[]
}

export interface ITopUsuarios extends IBase {
    totalCompra: number,
    totalPedidos: number,
    usuario: string
}