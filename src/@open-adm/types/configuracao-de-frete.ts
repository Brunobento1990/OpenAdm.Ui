export interface IConfiguracaoDeFrete {
    id: string,
    cepOrigem: string,
    alturaEmbalagem: string,
    larguraEmbalagem: string,
    comprimentoEmbalagem: string,
    chaveApi: string,
    peso?: number,
    cobrarCpf?: boolean,
    cobrarCnpj?: boolean,
    inativo?: boolean
}

export interface IConfiguracaoDeFreteCreate {
    cepOrigem: string,
    alturaEmbalagem: string,
    larguraEmbalagem: string,
    comprimentoEmbalagem: string,
    chaveApi: string,
    peso?: number,
    cobrarCpf?: boolean,
    cobrarCnpj?: boolean,
    inativo?: boolean
}