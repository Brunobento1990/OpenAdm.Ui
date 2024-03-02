import { ITabelaDePreco } from "src/@open-adm/types/tabela-de-preco";
import * as yup from 'yup';

export const defaultValues: ITabelaDePreco = {
    descricao: " ",
    ativaEcommerce: false,
    id: "",
    dataDeCriacao: "",
    dataDeAtualizacao: "",
    numero: 0,
    itensTabelaDePreco: []
}

export const schema = {
    descricao: yup
        .string()
        .required('Informe a descrição!')
}