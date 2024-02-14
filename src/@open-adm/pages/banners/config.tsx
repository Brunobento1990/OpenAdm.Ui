import { Avatar } from "@mui/material"
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid"

export function useConfig() {

    const columns: GridColDef[] = [
        {
            flex: 0.200,
            minWidth: 200,
            field: 'foto',
            headerName: 'Foto',
            renderCell: (params: GridRenderCellParams) => (
                <Avatar src={`data:image/jpeg;base64,${params.row.foto}`} />
            )
        }
    ]

    return {
        columns
    }
}