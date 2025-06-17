import { rotasApi } from "src/configs/rotasApi";
import { useNewApi } from "../hooks/use-new-api";
import { IPeso } from "../types/peso";


export function useApiPeso() {
    const apiGet = useNewApi({
        method: "GET",
        url: rotasApi.peso.obter,
    });

    const apiCreate = useNewApi({
        method: "POST",
        url: rotasApi.peso.create,
    });

    const apiUpdate = useNewApi({
        method: "PUT",
        url: rotasApi.peso.update,
    });

    async function obter(id: string): Promise<IPeso | undefined> {
        return await apiGet.fecth({ urlParams: `?id=${id}` });
    }

    async function create(body: Partial<IPeso>): Promise<IPeso | undefined> {
        return await apiCreate.fecth({ body });
    }

    async function update(body: Partial<IPeso>): Promise<IPeso | undefined> {
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
