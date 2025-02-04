import { TableIndex } from "src/@open-adm/components/table-paginacao";
import { useColumns } from "./config";

export function ClientePaginacao() {
    const { columns } = useColumns();
    return (
        <TableIndex
            columns={columns}
            url="usuarios/paginacao"
            urlAdd="cliente/create"
            urlView="cliente/view"
        />
    )
}