import { columns } from './config'
import { TableIndex } from "src/@open-adm/components/table-paginacao";

export function Categorias() {

    return (
        <TableIndex
            columns={columns}
            url="categorias/paginacao"
            urlAdd="categoria/create"
            urlDelete="categorias/delete"
            urlEdit="categoria/edit"
            urlView="categoria/view"
        />
    )
}