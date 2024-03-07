import Table from "src/@open-adm/components/table";
import { columns } from "./config";

export function MovimentacaoDeProdutos() {
    return (
        <>
            <Table
                columns={columns}
                title="Movimentações de produtos"
                url="movimentacao-de-produto/paginacao"
                add
                routeAdd="movimentacao-produto/create"
            />
        </>
    )
}