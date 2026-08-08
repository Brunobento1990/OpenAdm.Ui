import { IBase } from "./base";
import { IPedido } from "./pedido";
import { MeioDePagamentoEnum } from "../enuns/meio-de-pagamento-enum";

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
        id: MeioDePagamentoEnum.Dinheiro,
        descricao: 'Dinheiro'
    },
    {
        id: MeioDePagamentoEnum.Pix,
        descricao: 'Pix'
    },
    {
        id: MeioDePagamentoEnum.CartaoDeDebito,
        descricao: 'Cartão de débito'
    },
    {
        id: MeioDePagamentoEnum.CartaoDeCredito,
        descricao: 'Cartão de crédito'
    },
    {
        id: MeioDePagamentoEnum.Boleto,
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
