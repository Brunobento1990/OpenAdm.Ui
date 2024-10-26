import { useConfig } from "./config";
import { TableIndex } from "src/@open-adm/components/table-paginacao";

export function Banners() {

    const config = useConfig();

    return (
        <TableIndex
            columns={config.columns}
            url="banners/paginacao"
            urlAdd="banners/create"
            urlDelete="banners/delete"
            urlView="banners/view"
            urlEdit="banners/edit"
        />
    )
}