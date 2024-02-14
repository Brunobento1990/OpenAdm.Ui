import Table from "src/@open-adm/components/table";
import { useConfig } from "./config";

export function Pedidos() {

    const config = useConfig();

    return (
        <>
            <Table
                columns={config.columns}
                title="Pedidos"
                url="pedidos/paginacao"
                isPedido
                delete
                routeDelete="pedidos/delete"
            />
        </>
    )
}