import { ICliente } from "./cliente";
import { IPedido } from "./pedido";
import { ITransacaoFinanceira } from "./transacao-financeira";

export interface IFaturaCriar {
    usuarioId: string,
    pedidoId?: string,
    tipo: 0 | 1,
    quantidadeDeParcelas: number,
    parcelas: IParcela[],
    total: number;
}

export interface IPagarParcela {
    id: string,
    desconto?: number,
    meioDePagamento?: number,
    observacao?: string,
    valor: number,
    dataDePagamento?: string
}

export interface IParcela {
    id: string,
    dataDeCriacao: string,
    dataDeAtualizacao: string,
    numero: number,
    dataDeVencimento: string,
    numeroDaParcela: number,
    numeroDoPedido: number,
    meioDePagamento: number,
    valor: number,
    valorPagoRecebido: number,
    valorAPagarAReceber: number,
    desconto: number,
    observacao: string,
    vencida: boolean,
    faturaId: string,
    status: number,
    fatura: IFatura,
    transacoes?: ITransacaoFinanceira[],
}

export interface IFatura {
    id: string,
    dataDeCriacao: string,
    dataDeAtualizacao: string,
    numero: number,
    status: number,
    tipo: number,
    usuarioId: string,
    usuario: ICliente,
    pedidoId?: string,
    pedido?: IPedido,
    dataDeFechamento: string,
    parcelas: IParcela[],
    total: number
}