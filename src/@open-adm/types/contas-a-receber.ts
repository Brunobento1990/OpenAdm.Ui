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
        id: 1,
        descricao: 'Dinheiro'
    },
    {
        id: 2,
        descricao: 'Pix'
    },
    {
        id: 3,
        descricao: 'Cartão de débito'
    },
    {
        id: 4,
        descricao: 'Cartão de crédito'
    },
    {
        id: 5,
        descricao: 'Boleto'
    }
]

export const statusFaturaAReceber: any[] = [
    {
        id: 0,
        descricao: 'Pendente'
    },
    {
        id: 1,
        descricao: 'Pago'
    }
];

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
    contasAReceber: IContasAReceber,
    vencida?: boolean,
    dataDePagamento?: string;
}