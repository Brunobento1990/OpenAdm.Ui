import { ICliente } from "./cliente";
import { IPedido } from "./pedido";

export interface IFaturaCriar {
    usuarioId: string,
    pedidoId?: string,
    tipo: 0 | 1,
    quantidadeDeParcelas: number,
    parcelas: IParcela[],
    total: number;
}

export interface IParcela {
    id?: string;
    faturaId?: string;
    dataDeVencimento: string,
    numeroDaFatura: number,
    meioDePagamento?: number,
    valor: number,
    desconto?: number,
    observacao?: string
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