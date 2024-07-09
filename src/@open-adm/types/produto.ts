import { IBase } from "./base";
import { ICategoria } from "./categoria";
import { IPeso } from "./peso";
import { ITamanho } from "./tamanho";

export interface IProduto extends IBase {
    descricao: string;
    foto: string;
    referencia?: string;
    especificacaoTecnica?: string;
    categoriaId: string;
    categoria: ICategoria;
    tamanhos: ITamanho[];
    pesos: IPeso[];
    peso?: number;
}

export interface ICreateProdutoDto {
    descricao: string;
    foto: string;
    referencia?: string;
    especificacaoTecnica?: string;
    categoriaId: string;
    categoria: ICategoria;
    tamanhos: ITamanho[];
    pesos: IPeso[];
    peso?: number;
}