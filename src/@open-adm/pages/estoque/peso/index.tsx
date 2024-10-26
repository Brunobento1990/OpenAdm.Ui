import { columns } from './config'
import { TableIndex } from "src/@open-adm/components/table-paginacao";

export function Pesos() {

    return (
        <TableIndex
            columns={columns}
            url="pesos/paginacao"
            urlAdd="peso/create"
            urlDelete="pesos/delete"
            urlEdit="peso/edit"
            urlView="peso/view"
        />
    )
}