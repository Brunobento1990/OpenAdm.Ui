import { IconButton, Tooltip } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import IconifyIcon from 'src/@core/components/icon'
import { ThemeColor } from 'src/@core/layouts/types'
import { StatusApp } from 'src/@open-adm/components/chip'
import { useNavigateApp } from 'src/@open-adm/hooks/use-navigate-app'

export function useConfig() {
    const { navigate } = useNavigateApp();
    const columns: GridColDef[] = [
        {
            flex: 0.200,
            width: 200,
            field: 'usuario',
            headerName: 'Cliente',
        },
        {
            flex: 0.175,
            width: 10,
            field: 'status',
            headerName: 'Status',
            renderCell: (params: GridRenderCellParams) => {
                const status = statusPedido[params.row.statusPedido]

                return (
                    <StatusApp
                        cor={status.color}
                        titulo={status.title}
                    />
                )
            }
        },
        {
            field: 'status2',
            headerName: 'Baixar',
            align: 'center',
            renderCell: (params) => {
                return (
                    <Tooltip title="Modificar status do pedido" placement="top">
                        <IconButton onClick={() => navigate(`/pedidos/modificar-status-pedido/${params.row.id}`)}>
                            <IconifyIcon
                                icon='fe:app-menu'
                            />
                        </IconButton>
                    </Tooltip>
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
    4: { title: 'Cancelado', color: 'error' },//warning
}