import Table from "src/@open-adm/components/table";
import { columns } from './config'

export function Produtos() {

    return (
        <>
            <Table
                columns={columns}
                title="Produtos"
                url="produtos/paginacao"
                // delete
                // routeDelete="categorias/delete"
                add
                routeAdd="produto/create"
                view
                routeView="produto/view"
            // edit
            // routeEdit="categorias/edit"
            />
        </>
    )
}