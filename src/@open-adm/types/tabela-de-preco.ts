import { IBase } from "./base";
import { IPeso } from "./peso";
import { IProduto } from "./produto";
import { ITamanho } from "./tamanho";

export interface ITabelaDePreco extends IBase {
    descricao: string;
    ativaEcommerce: boolean;
    itensTabelaDePreco: IItensTabelaDePreco[]
}

export interface IItensTabelaDePreco extends IBase {
    valorUnitarioAtacado?: number;
    valorUnitarioVarejo?: number;
    produtoId: string;
    produto: IProduto;
    tabelaDePrecoId: string;
    tamanhoId?: string;
    tamanho?: ITamanho;
    pesoId?: string;
    peso?: IPeso
}