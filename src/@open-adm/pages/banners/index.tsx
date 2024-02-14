import Table from "src/@open-adm/components/table";
import { useConfig } from "./config";

export function Banners() {

    const config = useConfig();

    return (
        <>
            <Table
                columns={config.columns}
                title="Banners"
                url="banners/paginacao"
                delete
                routeDelete="banners/delete"
                add
                routeAdd="banners/create"
                view
                routeView="banners/view"
                edit
                routeEdit="banners/edit"
            />
        </>
    )
}