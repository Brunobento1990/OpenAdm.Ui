export interface IConfiguracaoDeFrete {
    id: string,
    dataDeCriacao: string,
    dataDeAtualizacao: string,
    numero: number,
    cepOrigem: string,
    alturaEmbalagem: string,
    larguraEmbalagem: string,
    comprimentoEmbalagem: string,
    peso?: number
}

export interface IConfiguracaoDeFreteCreate {
    cepOrigem: string,
    alturaEmbalagem: string,
    larguraEmbalagem: string,
    comprimentoEmbalagem: string,
    peso?: number
}