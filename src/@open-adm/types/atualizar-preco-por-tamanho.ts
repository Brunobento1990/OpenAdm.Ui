import { ITamanho } from "./tamanho";

export interface IAtualizarPrecoPorTamanho {
    tamanhoId: string;
    tamanho: ITamanho;
    valorUnitarioAtacado: number;
    valorUnitarioVarejo: number;
}