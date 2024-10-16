import Table from "src/@open-adm/components/table";
import { formatMoney } from "src/@open-adm/utils/format-money";
import { StatusObj } from "../../pedidos/config";
import CustomChip, { StatusApp } from 'src/@open-adm/components/chip'
import { formatDate } from "src/@open-adm/utils/convert-date";

export const statusFatura: StatusObj = {
    0: { title: 'Pendente', color: 'warning' },
    1: { title: 'Pago', color: 'success' }
}

export function ContasAReceberPaginacao() {

    return (
        <>
            <Table
                columns={[
                    {
                        flex: 0.200,
                        minWidth: 200,
                        field: 'numeroDaFatura',
                        headerName: 'N° fatura',
                    },
                    {
                        flex: 0.200,
                        field: 'valor',
                        headerName: 'Valor',
                        renderCell: (params) => formatMoney(params.row.valor)
                    },
                    {
                        flex: 0.175,
                        minWidth: 140,
                        field: 'status',
                        headerName: 'Status',
                        renderCell: (params) => {
                            const status = statusFatura[params.row.status]
                            return (
                                <StatusApp cor={status.color} titulo={status.title} />
                            )
                        }
                    },
                    {
                        flex: 0.200,
                        field: 'vencimento',
                        headerName: 'Vencimento',
                        renderCell: (params) => formatDate(params.row.dataDeVencimento)
                    },
                ]}
                title="Faturas contas a receber"
                url="fatura-contas-a-receber/paginacao"
                // add
                // routeAdd="banners/create"
                view
                routeView="contas-a-receber/view"
                edit
                routeEdit="contas-a-receber/edit"
            />
        </>
    )
}