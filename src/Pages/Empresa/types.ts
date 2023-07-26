export interface IEmpresaCreate {
    razaoSocial: string;
    nomeFantasia: string;
    cnpj: string;
    contato?: string;
    webSite?: string;
    email: string;
    senha: string;
}

export interface IEmpresaView {
    razaoSocial: string;
    nomeFantasia: string;
    dataDeCadastro: string;
    cnpj: string;
    contato?: string;
    webSite?: string;
    email: string;
    numero: number
}

export interface IEmpresaEdit {
    nomeFantasia: string;
    contato?: string;
    webSite?: string;
    email: string;
}