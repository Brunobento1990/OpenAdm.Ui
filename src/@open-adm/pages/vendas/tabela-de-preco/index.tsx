import Table from "src/@open-adm/components/table";
import { columns } from './config'

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
                // view
                // routeView="produto/view"
                // edit
                // routeEdit="produto/edit"
            />
        </>
    )
}