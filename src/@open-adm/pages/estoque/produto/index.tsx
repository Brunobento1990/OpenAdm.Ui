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
            //add
            //routeAdd="categoria/create"
            // view
            // routeView="categorias/view"
            // edit
            // routeEdit="categorias/edit"
            />
        </>
    )
}