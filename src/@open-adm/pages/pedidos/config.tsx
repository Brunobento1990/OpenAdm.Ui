import { IconButton, Tooltip } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import IconifyIcon from 'src/@core/components/icon'
import { ThemeColor } from 'src/@core/layouts/types'
import { StatusApp } from 'src/@open-adm/components/chip'
import { useNavigateApp } from 'src/@open-adm/hooks/use-navigate-app'
import { useNewApi } from 'src/@open-adm/hooks/use-new-api'
//import { IPedido } from 'src/@open-adm/types/pedido'
import { generatePdfFromBase64 } from 'src/@open-adm/utils/download-pdf'

export function useConfig() {
    const { navigate } = useNavigateApp();
    const api = useNewApi({
        method: 'GET',
        url: 'pedidos/download-pedido?pedidoId=',
    });

    async function downloadPedido(id: string) {
        const pdfBase64 = await api.fecth<any>({ urlParams: `${id}`, message: 'Download efetuado com sucesso!' });
        if (pdfBase64?.pdf) {
            const pdf = await generatePdfFromBase64(pdfBase64.pdf);
            const link = document.createElement('a');
            link.href = pdf;
            link.download = `${id}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            navigate('/pedidos')
        }
    }

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
            field: 'temEstoqueDisponivel',
            headerName: 'Estoque',
            renderCell: (params: any) => {
                if (params?.statusPedido === 3) {
                    return 'Fechado';
                }
                return params?.temEstoqueDisponivel ? 'Suficiente' : 'Insuficiente'
            }
        },
        {
            flex: 0.175,
            width: 10,
            field: 'status',
            headerName: 'Status',
            sortable: true,
            renderCell: (params: any) => {
                const status = statusPedido[params.statusPedido]

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
                        <IconButton onClick={() => navigate(`/pedidos/modificar-status-pedido/${params.id}`)}>
                            <IconifyIcon
                                icon='fe:app-menu'
                            />
                        </IconButton>
                    </Tooltip>
                )
            }
        },
        {
            field: 'status3',
            headerName: 'PDF',
            align: 'center',
            renderCell: (params: any) => {
                return (
                    <Tooltip title="Download do pedido" placement="top">
                        <IconButton
                            onClick={() => downloadPedido(`${params.id}`)}
                        >
                            <IconifyIcon
                                icon='material-symbols-light:download'
                            />
                        </IconButton>
                    </Tooltip>
                )
            }
        },
        // {
        //     field: 'pix',
        //     headerName: 'PIX',
        //     align: 'center',
        //     renderCell: (params: any) => {
        //         return (
        //             <Tooltip title="PIX" placement="top">
        //                 <IconButton
        //                     onClick={() => navigate(`pedidos/gerar-pix/${params.id}`)}
        //                 >
        //                     <IconifyIcon
        //                         icon='ic:sharp-pix'
        //                     />
        //                 </IconButton>
        //             </Tooltip>
        //         )
        //     }
        // }
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
    0: { title: 'Em aberto', color: 'warning' },
    1: { title: 'Faturado', color: 'primary' },
    2: { title: 'Em entrega', color: 'info' },
    3: { title: 'Entregue', color: 'success' },
    4: { title: 'Cancelado', color: 'error' },
}