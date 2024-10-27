export interface IFaturaCriar {
    usuarioId: string,
    pedidoId?: string,
    tipo: 0 | 1,
    quantidadeDeParcelas: number,
    parcelas: IParcela[],
    total: number;
}

export interface IParcela {
    dataDeVencimento: string,
    numeroDaFatura: number,
    meioDePagamento?: number,
    valor: number,
    desconto?: number,
    observacao?: string
}