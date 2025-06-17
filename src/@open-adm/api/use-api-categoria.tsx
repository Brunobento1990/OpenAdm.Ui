import { rotasApi } from "src/configs/rotasApi";
import { useNewApi } from "../hooks/use-new-api";
import { ICategoria } from "../types/categoria";


export function useApiCategoria() {
    const apiGet = useNewApi({
        method: "GET",
        url: rotasApi.categoria.obter,
    });

    const apiCreate = useNewApi({
        method: "POST",
        url: rotasApi.categoria.create,
    });

    const apiUpdate = useNewApi({
        method: "PUT",
        url: rotasApi.categoria.update,
    });

    async function obter(id: string): Promise<ICategoria | undefined> {
        return await apiGet.fecth({ urlParams: `?id=${id}` });
    }

    async function create(
        body: Partial<ICategoria>
    ): Promise<ICategoria | undefined> {
        return await apiCreate.fecth({ body });
    }

    async function update(
        body: Partial<ICategoria>
    ): Promise<ICategoria | undefined> {
        return await apiUpdate.fecth({ body });
    }

    return {
        obter: {
            fetch: obter,
            status: apiGet.statusRequisicao,
        },
        create: {
            fetch: create,
            status: apiCreate.statusRequisicao,
        },
        update: {
            fetch: update,
            status: apiUpdate.statusRequisicao,
        },
    };
}
