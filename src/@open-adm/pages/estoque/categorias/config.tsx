import { Box } from "@mui/material"
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
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
                src={`data:image/jpeg;base64,${params.row.foto}`}
                sx={{ width: '100px', height: '50px', borderRadius: '5px' }}
            />
        )
    },
    {
        flex: 0.200,
        minWidth: 200,
        field: 'descricao',
        headerName: 'Descricao'
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
