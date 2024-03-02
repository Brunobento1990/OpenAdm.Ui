import { Checkbox } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Table from "src/@open-adm/components/table";

const columns: GridColDef[] = [
    {
        flex: 0.200,
        minWidth: 200,
        field: 'descricao',
        headerName: 'Descricao'
    },
    {
        flex: 0.200,
        minWidth: 200,
        field: 'ativaEcommerce',
        headerName: 'Ativa',
        renderCell: (params: GridRenderCellParams) => (
            <Checkbox checked={params.row.ativaEcommerce} />
        )
    }
]

export function TabelaDePrecoIndex() {

    return (
        <>
            <Table
                columns={columns}
                title="Tabela de preço"
                url="tabelas-de-precos/paginacao"
                // delete
                // routeDelete="produtos/delete"
                // add
                // routeAdd="produto/create"
                view
                routeView="tabeladepreco/view"
            // edit
            // routeEdit="produto/edit"
            />
        </>
    )
}