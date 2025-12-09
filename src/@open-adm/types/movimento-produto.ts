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
    pesoId?: string;
    tamanhoId?: string;
    produto: string;
    categoria?: string;
    peso?: string;
    tamanho?: string;
    quantidade: number;
    quantidadeDisponivel: number;
    quantidadeReservada: number;
}