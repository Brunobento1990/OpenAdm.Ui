import { ICategoria } from "./categoria";
import { IPosicaoEstoqueUpdate } from "./movimento-produto";
import { IPeso } from "./peso";
import { IProduto } from "./produto";
import { ITamanho } from "./tamanho";

export interface IRelatorioPosicaoEstoqueRequest {
    produtos: IProduto[];
    pesos: IPeso[];
    tamanhos: ITamanho[];
    categorias: ICategoria[];
}

export interface IRelatorioPosicaoEstoqueResponse {
    itens: IPosicaoEstoqueUpdate[];
}