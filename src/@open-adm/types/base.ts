export interface IBase {
    id: string;
    dataDeCriacao: string;
    dataDeAtualizacao: string;
    numero: number;
}

export interface IEnderecoBase {
    id: string;
    cep: string;
    logradouro: string;
    localidade: string;
    bairro: string;
    numero: string;
    complemento: string;
    uf: string;
}