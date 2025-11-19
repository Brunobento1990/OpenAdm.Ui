import { IConfiguracaoDePedido } from "src/@open-adm/types/configuracao-pedido";
import * as yup from 'yup';

export const defaultValues: IConfiguracaoDePedido = {
    emailDeEnvio: "",
    ativo: false,
    id: "",
    dataDeCriacao: "",
    dataDeAtualizacao: "",
    numero: 0,
    vendaDeProdutoComEstoque: false,
}

export const schema = yup.object().shape({
    emailDeEnvio: yup
        .string()
        .max(255, "Campo máximo exedido!")
        .email('E-mail inválido!')
        .required("Informe o e-mail!")
})