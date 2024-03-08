import { Box, Checkbox } from "@mui/material"
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid"

export function useConfig() {

    const columns: GridColDef[] = [
        {
            flex: 0.200,
            minWidth: 200,
            field: 'foto',
            headerName: 'Foto',
            renderCell: (params: GridRenderCellParams) => (
                <Box
                    component="img"
                    src={params.row.foto}
                    sx={{ width: '100px', height: '50px', borderRadius: '5px' }}
                />
            )
        },
        {
            flex: 0.200,
            minWidth: 200,
            field: 'ativo',
            headerName: 'Ativo',
            renderCell: (params: GridRenderCellParams) => (
                <Checkbox checked={params.row.ativo} />
            )
        }
    ]

    return {
        columns
    }
}