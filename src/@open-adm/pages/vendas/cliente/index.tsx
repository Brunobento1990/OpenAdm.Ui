import { columns } from "./config";
import { TableIndex } from "src/@open-adm/components/table-paginacao";

export function ClientePaginacao() {
    return (
        <TableIndex
            columns={columns}
            url="usuarios/paginacao"
            urlAdd="cliente/create"
            urlView="cliente/view"
        />
    )
}