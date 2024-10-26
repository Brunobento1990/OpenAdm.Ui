import { columns } from './config'
import { TableIndex } from "src/@open-adm/components/table-paginacao";

export function Produtos() {
    return (
        <TableIndex
            columns={columns}
            url="produtos/paginacao"
            urlAdd="produto/create"
            urlDelete="produtos/delete"
            urlEdit="produto/edit"
            urlView="produto/view"
        />
    )
}