import Table from "src/@open-adm/components/table";
import { columns } from "./config";

export function EstoqueProduto() {
    return (
        <>
            <Table
                columns={columns}
                title="Posições de estoque"
                url="estoques/paginacao"
            />
        </>
    )
}