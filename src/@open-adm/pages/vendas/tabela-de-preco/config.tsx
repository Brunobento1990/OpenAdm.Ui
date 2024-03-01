import { Box, Checkbox } from "@mui/material"
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import { IProduto } from "src/@open-adm/types/produto";
import * as yup from 'yup';

export const columns: GridColDef[] = [
    {
        flex: 0.200,
        minWidth: 200,
        field: 'descricao',
        headerName: 'Descricao'
    },
    {
        flex: 0.200,
        minWidth: 200,
        field: 'ativaEcommerce',
        headerName: 'Ativa',
        renderCell: (params: GridRenderCellParams) => (
            <Checkbox checked={params.row.ativaEcommerce} />
        )
    }
]