import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { StatusObj } from "../../pedidos/config";
import CustomChip from 'src/@open-adm/components/chip'

export const quantidade: StatusObj = {
    0: { title: 'Em aberto', color: 'warning' },
    1: { title: 'Entregue', color: 'success' },
}

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
        headerName: 'Posição do estoque',
        renderCell: (params: GridRenderCellParams) => {
            const status = quantidade[params.row.quantidade > 0 ? 1 : 0]

            return (
                <CustomChip
                    rounded
                    size='small'
                    skin='light'
                    color={status.color}
                    label={params.row.quantidade}
                    sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
                />
            )
        }
    },
]