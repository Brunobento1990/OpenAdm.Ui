import Table from "src/@open-adm/components/table";
import { formatMoney } from "src/@open-adm/utils/format-money";
import { StatusObj } from "../../pedidos/config";
import CustomChip, { StatusApp } from 'src/@open-adm/components/chip'
import { formatDate } from "src/@open-adm/utils/convert-date";
import { TableIndex } from "src/@open-adm/components/table-paginacao";

export const statusFatura: StatusObj = {
    0: { title: 'Pendente', color: 'warning' },
    1: { title: 'Pago', color: 'success' }
}

interface propsFaturaPaginacao {
    tipo: 0 | 1,
    urlView: string;
    urlEdit: string;
    urlAdd: string;
}

export function FaturaPaginacao(props: propsFaturaPaginacao) {

    return (
        <>
            <TableIndex
                columns={[
                    {
                        flex: 0.200,
                        minWidth: 200,
                        field: 'numeroDaFatura',
                        headerName: 'N° fatura',
                        sortable: true,
                    },
                    {
                        flex: 0.200,
                        field: 'valor',
                        headerName: 'Valor',
                        renderCell: (params: any) => formatMoney(params.valor),
                        sortable: true,
                    },
                    {
                        flex: 0.175,
                        minWidth: 140,
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
                        flex: 0.200,
                        field: 'vencimento',
                        headerName: 'Vencimento',
                        renderCell: (params: any) => formatDate(params.dataDeVencimento),
                        sortable: true,
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
        </>
    )
}