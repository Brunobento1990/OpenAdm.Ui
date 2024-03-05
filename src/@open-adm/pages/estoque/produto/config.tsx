import { Box } from "@mui/material"
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import { IProduto } from "src/@open-adm/types/produto";
import * as yup from 'yup';

export const columns: GridColDef[] = [
    {
        flex: 0.200,
        minWidth: 200,
        field: 'foto',
        headerName: 'Foto',
        renderCell: (params: GridRenderCellParams) => (
            <Box
                component="img"
                loading="lazy"
                src={params.row.foto}
                sx={{ width: '100px', height: '50px', borderRadius: '5px' }}
            />
        )
    },
    {
        flex: 0.200,
        minWidth: 200,
        field: 'descricao',
        headerName: 'Descricao'
    },
    {
        flex: 0.200,
        minWidth: 200,
        field: 'referencia',
        headerName: 'Referencia'
    }
]

export const defaultValues: IProduto = {
    descricao: '',
    foto: "",
    categoriaId: "",
    id: "",
    dataDeCriacao: "",
    dataDeAtualizacao: "",
    numero: 0,
    categoria: {
        descricao: "",
        id: "",
        dataDeCriacao: "",
        dataDeAtualizacao: "",
        numero: 0
    },
    tamanhos: [],
    pesos: []
}

export const schema = yup.object().shape({
    descricao: yup
        .string()
        .max(255, "Campo máximo exedido!")
        .required("Informe a descrição!"),
    categoriaId: yup
        .string()
        .required("Informe a categoria!")
})