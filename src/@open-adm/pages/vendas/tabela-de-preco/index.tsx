import { Checkbox } from "@mui/material";
import { TableIndex } from "src/@open-adm/components/table-paginacao";
import { TypeColumns } from "src/@open-adm/components/table/tabela-com-drag";

const columns: TypeColumns[] = [
    {
        width: 200,
        field: 'descricao',
        headerName: 'Descricao',
        sortable: true,
    },
    {
        width: 200,
        field: 'ativaEcommerce',
        headerName: 'Ativa',
        cellRenderer: (params: { data: any }) => (
            <Checkbox checked={params.data.ativaEcommerce} />
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
            nomeDaTabela="tabela-de-preco"
        />
    )
}