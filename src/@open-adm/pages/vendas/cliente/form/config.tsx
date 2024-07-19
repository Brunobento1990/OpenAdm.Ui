import { YupAdapter } from "src/@open-adm/adapters/yup-adapter";

export const schema = new YupAdapter()
    .email('email')
    .string("nome")
    .string("senha")
    .string("reSenha")
    .string("telefone")
    .build();

export const initialValues = {
    email: '',
    nome: '',
    telefone: '',
    cnpj: '',
    cpf: '',
    senha: '',
    reSenha: ''
}