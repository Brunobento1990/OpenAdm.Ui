import { columns } from './config'
import { TableIndex } from "src/@open-adm/components/table-paginacao";

export function LojasParceirasPaginacao() {
    return (
        <TableIndex
            columns={columns}
            url="lojas-parceiras/paginacao"
            urlAdd="lojas-parceiras/create"
            urlDelete="lojas-parceiras/delete"
            urlView="lojas-parceiras/view"
            urlEdit="lojas-parceiras/edit"
        />
    )
    // return (
    //     <>
    //         <Table
    //             columns={columns}
    //             title="Lojas parceiras"
    //             url="lojas-parceiras/paginacao"
    //             delete
    //             routeDelete="lojas-parceiras/delete"
    //             add
    //             routeAdd="lojas-parceiras/create"
    //             view
    //             routeView="lojas-parceiras/view"
    //             edit
    //             routeEdit="lojas-parceiras/edit"
    //         />
    //     </>
    // )
}