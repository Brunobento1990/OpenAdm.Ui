import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
    {
        flex: 0.200,
        minWidth: 200,
        field: 'produto',
        headerName: 'Produto'
    },
    {
        flex: 0.200,
        minWidth: 200,
        field: 'quantidade',
        headerName: 'Posição do estoque'
    },
]