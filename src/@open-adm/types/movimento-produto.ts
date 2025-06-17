import { IPeso } from "./peso";
import { IProduto } from "./produto";
import { ITamanho } from "./tamanho";

export interface IMovimentoProduto {
    produtoId: string;
    produto: IProduto;
    tamanhoId?: string;
    tamanho?: ITamanho;
    pesoId?: string;
    peso?: IPeso;
    quantidade: number;
    observacao?: string;
    tipoMovimentacaoDeProduto: number;
}

export interface IPosicaoEstoqueUpdate {
    produtoId: string;
    produto: string;
    quantidade: number;
}