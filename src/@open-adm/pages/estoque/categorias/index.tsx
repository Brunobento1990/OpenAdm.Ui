import Table from "src/@open-adm/components/table";
import { columns } from './config'

export function Categorias() {

    return (
        <>
            <Table
                columns={columns}
                title="Categorias"
                url="categorias/paginacao"
                // delete
                // routeDelete="categorias/delete"
                add
                routeAdd="categoria/create"
            // view
            // routeView="categorias/view"
            // edit
            // routeEdit="categorias/edit"
            />
        </>
    )
}