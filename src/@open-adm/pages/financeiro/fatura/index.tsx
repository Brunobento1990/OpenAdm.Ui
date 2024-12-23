import { formatMoney } from "src/@open-adm/utils/format-money";
import { StatusObj } from "../../pedidos/config";
import { StatusApp } from 'src/@open-adm/components/chip'
import { formatDate } from "src/@open-adm/utils/convert-date";
import { TableIndex } from "src/@open-adm/components/table-paginacao";
import { useNavigateApp } from "src/@open-adm/hooks/use-navigate-app";
import { IconButton, Tooltip } from "@mui/material";
import IconifyIcon from "src/@core/components/icon";

export const statusFatura: StatusObj = {
    0: { title: 'Pendente', color: 'warning' },
    1: { title: 'Pago parcial', color: 'info' },
    2: { title: 'Pago', color: 'success' },
}

interface propsFaturaPaginacao {
    tipo: 0 | 1,
    urlView: string;
    urlEdit: string;
    urlAdd: string;
}

export function FaturaPaginacao(props: propsFaturaPaginacao) {
    const { navigate } = useNavigateApp();
    return (
        <TableIndex
            minWidth={2500}
            columns={[
                {
                    width: 120,
                    field: 'numeroDaFatura',
                    headerName: 'N° fatura',
                    sortable: true,
                    renderCell: (params: any) => params.fatura?.numero,
                },
                {
                    width: 130,
                    field: 'numeroDaParcela',
                    headerName: 'N° parcela',
                    sortable: true,
                    renderCell: (params: any) => params.numeroDaParcela,
                },
                {
                    width: 130,
                    field: 'numeroDoPedido',
                    headerName: 'N° pedido',
                    renderCell: (row: any) => `#${row.numeroDoPedido ?? ''}`
                },
                {
                    width: 250,
                    field: 'cliente',
                    headerName: 'Cliente',
                    renderCell: (row: any) => `${row.fatura?.usuario?.nome ?? ''}`
                },
                {
                    width: 130,
                    field: 'valor',
                    headerName: 'Valor',
                    renderCell: (params: any) => formatMoney(params.valor),
                    sortable: true,
                },
                {
                    width: 130,
                    field: 'valor_pago_recebido',
                    headerName: 'Valor pago',
                    renderCell: (params: any) => formatMoney(params.valorPagoRecebido),
                    sortable: true,
                },
                {
                    width: 140,
                    field: 'valor_pagar',
                    headerName: 'Valor a pagar',
                    renderCell: (params: any) => formatMoney(params.valorAPagarAReceber),
                    sortable: true,
                },
                {
                    width: 130,
                    field: 'status',
                    headerName: 'Status',
                    renderCell: (params: any) => {
                        const status = statusFatura[params.status]
                        return (
                            <StatusApp cor={status.color} titulo={status.title} />
                        )
                    },
                    sortable: true,
                },
                {
                    width: 150,
                    field: 'vencimento',
                    headerName: 'Vencimento',
                    renderCell: (params: any) => formatDate(params.dataDeVencimento),
                    sortable: true,
                },
                {
                    width: 150,
                    field: 'baixa',
                    headerName: 'Baixar',
                    renderCell: (params: any) => {
                        return (
                            <IconButton onClick={() => navigate(`/financeiro/fatura/baixar/${params.id}`)}>
                                <IconifyIcon
                                    icon='fe:app-menu'
                                />
                            </IconButton>
                        )
                    }
                },
            ]}
            url="parcela/paginacao"
            urlView={props.urlView}
            urlEdit={props.urlEdit}
            urlAdd={props.urlAdd}
            filtroComplementar={{
                tipo: props.tipo
            }}
        />
    )
}