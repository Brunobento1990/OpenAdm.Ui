import { TypeColumns } from "src/@open-adm/components/table/tabela-com-drag";
import * as yup from 'yup';

export const columns: TypeColumns[] = [
    {
        width: 200,
        field: 'descricao',
        headerName: 'Descrição',
        sortable: true,
    },
    {
        width: 200,
        field: 'pesoReal',
        headerName: 'Peso real'
    }
]

export const defaultValues = {
    descricao: ''
}

export const schema = yup.object().shape({
    descricao: yup
        .string()
        .max(255, "Campo máximo exedido!")
        .required("Informe a descrição!")
})
