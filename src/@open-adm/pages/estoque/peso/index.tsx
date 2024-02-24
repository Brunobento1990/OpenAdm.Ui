import Table from "src/@open-adm/components/table";
import { columns } from './config'

export function Pesos() {

    return (
        <>
            <Table
                columns={columns}
                title="Pesos"
                url="pesos/paginacao"
                delete
                routeDelete="pesos/delete"
                add
                routeAdd="peso/create"
                view
                routeView="peso/view"
                edit
                routeEdit="peso/edit"
            />
        </>
    )
}