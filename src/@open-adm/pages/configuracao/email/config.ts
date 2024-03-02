import { IConfiguracaoDeEmail } from "src/@open-adm/types/configuracao-email";
import * as yup from 'yup';

export const defaultValues: IConfiguracaoDeEmail = {
    email: "",
    servidor: "",
    senha: "",
    porta: 0,
    ativo: false,
    id: "",
    dataDeCriacao: "",
    dataDeAtualizacao: "",
    numero: 0
}

export const schema = yup.object().shape({
    email: yup
        .string()
        .max(255, "Campo máximo exedido!")
        .email('E-mail inválido!')
        .required("Informe o e-mail!"),
    senha: yup
        .string()
        .required('Informe a senha!'),
    servidor: yup
        .string()
        .required('Informe o servidor!'),
    porta: yup
        .number()
        .required('Informe a porta')
})