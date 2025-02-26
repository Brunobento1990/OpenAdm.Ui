import { GridColDef } from "@mui/x-data-grid"
import * as yup from 'yup';

export const columns: GridColDef[] = [
    {
        flex: 0.200,
        minWidth: 200,
        field: 'descricao',
        headerName: 'Descrição',
        sortable: true,
    },
    {
        flex: 0.200,
        minWidth: 200,
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
