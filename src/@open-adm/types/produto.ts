import { IBase } from "./base";

export interface IProduto extends IBase {
    descricao: string;
    foto: string;
    referencia?: string;
    especificacaoTecnica?: string;
    categoriaId: string;
}