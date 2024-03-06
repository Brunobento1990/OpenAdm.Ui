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
    vinculoProdutoTabelaDePreco: IVinculoProdutoTabelaDePrecoDto;
}

export interface IVinculoProdutoItemTabelaDePrecoDto {
    valorUnitarioAtacado?: number;
    valorUnitarioVarejo?: number;
    pesoId?: string
    tamanhoId?: string
}

export interface IVinculoProdutoTabelaDePrecoDto {
    tabelaDePrecoId: string;
    itens: IVinculoProdutoItemTabelaDePrecoDto[]
}