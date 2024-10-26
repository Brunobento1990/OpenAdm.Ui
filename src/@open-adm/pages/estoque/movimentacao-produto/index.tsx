import { columns } from "./config";
import { TableIndex } from "src/@open-adm/components/table-paginacao";

export function MovimentacaoDeProdutos() {
    return (
        <TableIndex
            columns={columns}
            url="movimentacao-de-produto/paginacao"
            urlAdd="movimentacao-produto/create"
        />
    )
}