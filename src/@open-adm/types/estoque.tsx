export interface IMovimentacaoDeProduto {
    produtoId: string;
    quantidade: number;
    tipoMovimentacaoDeProduto: number;
}

export interface IEstoqueEdit {
    quantidade: number;
    produtoId: string;
    produto?: string;
}