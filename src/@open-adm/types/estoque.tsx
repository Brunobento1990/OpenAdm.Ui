import { IPosicaoEstoqueUpdate } from "./movimento-produto";

export interface IMovimentacaoDeProduto {
    produtoId: string;
    quantidade: number;
    tipoMovimentacaoDeProduto: number;
    pesoId?: string;
    tamanhoId?: string;
}

export interface IEstoqueEdit {
    quantidade: number;
    produtoId: string;
    produto?: string;
    peso?: string;
    tamanho?: string;
}

export interface IItemUpdateEstoques {
    quantidade?: number;
    id: string;
}

export interface IUpdateEstoques {
    dados: IItemUpdateEstoques[];
}

export interface IEstoque extends IPosicaoEstoqueUpdate {
    id: string
}


export interface ITodosEstoqueProdutos {
    dados: IEstoque[]
}