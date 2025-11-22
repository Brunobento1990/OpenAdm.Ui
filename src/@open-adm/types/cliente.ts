import { IBase, IEnderecoBase } from "./base";

export interface IClienteCreate {
  email: string;
  nome: string;
  senha: string;
  reSenha: string;
  telefone?: string;
  cnpj?: string;
}

export interface ICliente extends IBase {
  email: string;
  nome: string;
  telefone?: string;
  cnpj?: string;
  cpf?: string;
  avatar?: string;
  quantidadeDePedido?: number;
  isAtacado?: boolean;
  senha: string;
  reSenha: string;
  enderecoUsuario?: IEnderecoBase;
  ativo?: boolean;
}