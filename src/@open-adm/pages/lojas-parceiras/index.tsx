import Table from "src/@open-adm/components/table";
import { columns } from './config'

export function LojasParceirasPaginacao() {

    return (
        <>
            <Table
                columns={columns}
                title="Lojas parceiras"
                url="lojas-parceiras/paginacao"
                delete
                routeDelete="lojas-parceiras/delete"
                add
                routeAdd="lojas-parceiras/create"
                view
                routeView="lojas-parceiras/view"
                edit
                routeEdit="lojas-parceiras/edit"
            />
        </>
    )
}