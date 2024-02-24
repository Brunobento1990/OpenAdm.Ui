import Table from "src/@open-adm/components/table";
import { columns } from './config'

export function Tamanhos() {

    return (
        <>
            <Table
                columns={columns}
                title="Tamanhos"
                url="tamanhos/paginacao"
                delete
                routeDelete="tamanhos/delete"
                add
                routeAdd="tamanho/create"
                view
                routeView="tamanho/view"
                edit
                routeEdit="tamanho/edit"
            />
        </>
    )
}