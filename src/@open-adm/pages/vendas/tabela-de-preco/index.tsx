import { Checkbox } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { TableIndex } from "src/@open-adm/components/table-paginacao";

const columns: GridColDef[] = [
    {
        flex: 0.200,
        minWidth: 200,
        field: 'descricao',
        headerName: 'Descricao',
        sortable: true,
    },
    {
        flex: 0.200,
        minWidth: 200,
        field: 'ativaEcommerce',
        headerName: 'Ativa',
        renderCell: (params: any) => (
            <Checkbox checked={params.ativaEcommerce} />
        )
    }
]

export function TabelaDePrecoIndex() {

    return (
        <TableIndex
            columns={columns}
            url="tabelas-de-precos/paginacao"
            urlAdd="tabeladepreco/create"
            urlEdit="tabeladepreco/edit"
            urlView="tabeladepreco/view"
        />
    )
}