import Table from "src/@open-adm/components/table";
import { columns } from "./config";

export function ClientePaginacao() {
    return (
        <Table
            columns={columns}
            title="Clientes"
            url="usuarios/paginacao"
            add
            routeAdd="cliente/create"
            view
            routeView="cliente/view"
        />
    )
}