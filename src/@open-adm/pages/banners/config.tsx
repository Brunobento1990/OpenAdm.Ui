import { Box, Checkbox } from "@mui/material"
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid"

export function useConfig() {

    const columns: GridColDef[] = [
        {
            flex: 0.200,
            minWidth: 200,
            field: 'foto',
            headerName: 'Foto',
            renderCell: (params: any) => (
                <Box
                    component="img"
                    src={params.foto}
                    sx={{ width: '100px', height: '50px', borderRadius: '5px' }}
                />
            ),
            sortable: true,
        },
        {
            flex: 0.200,
            minWidth: 200,
            field: 'ativo',
            headerName: 'Ativo',
            renderCell: (params: any) => (
                <Checkbox checked={params.ativo} />
            ),
            sortable: true,
        }
    ]

    return {
        columns
    }
}