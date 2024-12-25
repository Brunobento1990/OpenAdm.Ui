import { IParcela } from "./fatura";

export interface ITransacaoFinanceira {
    id: string,
    dataDeCriacao: string,
    dataDeAtualizacao: string,
    numero: number,
    parcelaId?: string,
    parcela?: IParcela,
    dataDePagamento: string,
    valor: number,
    tipoTransacaoFinanceira: TipoTransacaoFinanceira,
    meioDePagamento: number,
    observacao: string,
    ehEstorno?: boolean;
}

export type TipoTransacaoFinanceira = 0 | 1;

export interface IExtratoTrasacao {
    dataInicial: string;
    dataFinal: string;
    clienteId?: string;
    pedidoId?: string;
}