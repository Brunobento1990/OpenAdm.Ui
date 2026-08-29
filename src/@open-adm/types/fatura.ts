import { ICliente } from "./cliente";
import { IPedido } from "./pedido";
import { ITransacaoFinanceira } from "./transacao-financeira";
import { TipoFaturaEnum } from "../enuns/tipo-fatura-enum";
import { StatusParcelaEnum } from "../enuns/status-parcela-enum";

export interface IParcelaPaginacaoResponse {
    id: string,
    numeroFatura: number,
    numeroDaParcela: number,
    numeroPedido: number,
    nomeUsuario: string,
    valor: number,
    status: StatusParcelaEnum,
    valorPagoRecebido: number,
    valorAPagarAReceber: number,
    valorPagoRecebidoLiquido: number;
    descontoConcedido: number;
    vencimento: string,
    quitada: boolean
}

export interface IFaturaCriar {
    usuarioId: string,
    pedidoId?: string,
    tipo: TipoFaturaEnum,
    quantidadeDeParcelas: number,
    parcelas: IParcelaCriar[],
    total: number;
}

export interface IParcelaCriar {
    dataDeVencimento: string,
    numeroDaParcela: number,
    meioDePagamento?: number,
    valor: number,
    aVista: boolean,
    desconto?: number,
    observacao?: string
}

export interface ICriarFaturaRequest {
    usuarioId?: string,
    pedidoId?: string,
    tipo: TipoFaturaEnum,
    parcelas: IParcelaCriar[]
}

export interface IBaixarFaturaAutomaticamenteRequest {
    pedidoId: string,
    desconto: number
}

export interface ICobrancaPedidoResponse {
    id: string,
    numero: number,
    pedidoId: string,
    total: number,
    status: number
}

export interface IPagarParcela {
    id: string,
    desconto?: number,
    juros?: number,
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
    desconto?: number,
    juros?: number,
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
    tipo: TipoFaturaEnum,
    usuarioId: string,
    usuario: ICliente,
    pedidoId?: string,
    pedido?: IPedido,
    dataDeFechamento: string,
    parcelas: IParcela[],
    total: number
}
