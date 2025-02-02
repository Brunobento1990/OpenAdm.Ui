import { IBase } from "./base";
import { ICliente } from "./cliente";
import { IPeso } from "./peso";
import { IProduto } from "./produto";
import { ITabelaDePreco } from "./tabela-de-preco";
import { ITamanho } from "./tamanho";

export interface IPedido extends IBase {
    statusPedido: number,
    valorTotal: number,
    totalItens: number,
    usuario: string,
    totalAReceber?: number;
    itensPedido: IItemPedido[]
}

export interface IPedidoCreate {
    usuarioId: string;
    usuario: ICliente;
    tabelaDePrecoId: string;
    tabelaDePreco: ITabelaDePreco;
    itens: IItemPedidoCreate[]
}

export interface IItemPedidoCreate {
    produtoId: string;
    produto: IProduto;
    pesoId?: string;
    peso?: IPeso;
    tamanhoId?: string;
    tamanho?: ITamanho;
    valorUnitario: number;
    quantidade?: number;
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
