import { Chip, IconButton, Tooltip } from '@mui/material'
import IconifyIcon from 'src/@core/components/icon'
import { ThemeColor } from 'src/@core/layouts/types'
import { StatusApp } from 'src/@open-adm/components/chip'
import { TypeColumns } from 'src/@open-adm/components/table/tabela-com-drag'
import { useNavigateApp } from 'src/@open-adm/hooks/use-navigate-app'
import { useNewApi } from 'src/@open-adm/hooks/use-new-api'
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

    const columns: TypeColumns[] = [
        {
            width: 200,
            field: 'usuario',
            headerName: 'Cliente',
        },
        {
            width: 10,
            field: 'temEstoqueDisponivel',
            headerName: 'Estoque',
            cellRenderer: (params: { data: any }) => {
                if (params?.data.statusPedido === 3) {
                    return 'Fechado';
                }
                const cor = params?.data.porcentagemEstoqueAtendido <= 20 ? 'error'
                    : params?.data.porcentagemEstoqueAtendido <= 50 ? 'warning' : 'success';
                return <Chip label={`${params?.data.porcentagemEstoqueAtendido}%`} color={cor} />;
            }
        },
        {
            width: 10,
            field: 'status',
            headerName: 'Status',
            sortable: true,
            cellRenderer: (params: { data: any }) => {
                const status = statusPedido[params.data.statusPedido]

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
            cellRenderer: (params: { data: any }) => {
                return (
                    <Tooltip title="Modificar status do pedido" placement="top">
                        <IconButton onClick={() => navigate(`/pedidos/modificar-status-pedido/${params.data.id}`)}>
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
            cellRenderer: (params: { data: any }) => {
                return (
                    <Tooltip title="Download do pedido" placement="top">
                        <IconButton
                            onClick={() => downloadPedido(`${params.data.id}`)}
                        >
                            <IconifyIcon
                                icon='material-symbols-light:download'
                            />
                        </IconButton>
                    </Tooltip>
                )
            }
        },
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