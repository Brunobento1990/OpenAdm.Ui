import { IBase } from "./base";
import { IPeso } from "./peso";
import { IProduto } from "./produto";
import { ITamanho } from "./tamanho";

export interface IPedido extends IBase {
    statusPedido: number,
    valorTotal: number,
    totalItens: number,
    usuario: string,
    itensPedido: IItemPedido[]
}

export interface IAtualizarStatusPedido {
    pedidoId: string;
    statusPedido: number;
}

export interface IItemPedido extends IBase {
    pesoId?: string,
    peso?: IPeso,
    tamanhoId?: string,
    tamanho?: ITamanho,
    produtoId: string,
    produto: IProduto,
    pedidoId: string,
    valorUnitario: number,
    quantidade: number,
    valorTotal: number
}
