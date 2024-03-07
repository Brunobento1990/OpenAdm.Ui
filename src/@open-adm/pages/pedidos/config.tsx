import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { ThemeColor } from 'src/@core/layouts/types'
import CustomChip from 'src/@open-adm/components/chip'

export function useConfig() {

    const columns: GridColDef[] = [
        {
            flex: 0.200,
            minWidth: 200,
            field: 'usuario',
            headerName: 'Cliente',
        },
        {
            flex: 0.175,
            minWidth: 140,
            field: 'status',
            headerName: 'Status',
            renderCell: (params: GridRenderCellParams) => {
                const status = statusPedido[params.row.statusPedido]

                return (
                    <CustomChip
                        rounded
                        size='small'
                        skin='light'
                        color={status.color}
                        label={status.title}
                        sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
                    />
                )
            }
        }
    ]

    return {
        columns
    }
}

export interface StatusObj {
    [key: number]: {
        title: string
        color: ThemeColor
    }
}

export const statusPedido: StatusObj = {
    0: { title: 'Em aberto', color: 'warning' },//
    1: { title: 'Faturado', color: 'primary' },//success
    2: { title: 'Em entrega', color: 'info' },
    3: { title: 'Entregue', color: 'success' },//warning
}