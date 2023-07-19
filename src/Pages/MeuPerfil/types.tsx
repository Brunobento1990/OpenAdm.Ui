export interface IUsuarioView {
    numero: number;
    nome: string;
    telefone?: string;
    ddd?: string;
    observacao?: string;
    email: string;
    enderecoId?: string;
    endereco?: IEnderecoView;
    avatar?: string;
}

export interface IEnderecoView {
    cep: string;
    logradouro: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
}