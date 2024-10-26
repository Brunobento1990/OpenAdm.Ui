import { columns } from "./config";
import { TableIndex } from "src/@open-adm/components/table-paginacao";

export function EstoqueProduto() {
    return (
        <TableIndex
            columns={columns}
            url="estoques/paginacao"
            urlEdit="posicao-estoque/edit"
        />
    )
}