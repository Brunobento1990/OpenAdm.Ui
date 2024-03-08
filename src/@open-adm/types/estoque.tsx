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