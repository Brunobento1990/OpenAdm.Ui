import { IBase } from "./base";
import { IPedido } from "./pedido";

export interface IContasAReceber extends IBase {
    status: 0,
    usuarioId: string,
    usuario: any,
    pedidoId?: string,
    pedido?: IPedido,
    dataDeFechamento?: 'string',
    total: number,
    faturas: IFaturaContasAReceber[]
}

export const meiosDePagamentos: any[] = [
    {
        id: 0,
        descricao: 'Dinheiro'
    },
    {
        id: 1,
        descricao: 'Pix'
    },
    {
        id: 2,
        descricao: 'Cartão de débito'
    },
    {
        id: 3,
        descricao: 'Cartão de crédito'
    },
    {
        id: 4,
        descricao: 'Boleto'
    }
]

export interface IPagarFaturaAReceber {
    id: string,
    desconto?: number,
    meioDePagamento?: number,
    observacao?: string
}

export interface IFaturaContasAReceber extends IBase {
    status: number,
    dataDeVencimento: string,
    numeroDaFatura: number,
    meioDePagamento: number,
    valor: number,
    desconto?: number,
    observacao?: string,
    contasAReceberId: string,
    contasAReceber: IContasAReceber
}