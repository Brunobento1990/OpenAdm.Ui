import { rotasApi } from "src/configs/rotasApi";
import { useNewApi } from "../hooks/use-new-api";
import { ITamanho } from "../types/tamanho";


export function useApiTamanho() {
    const apiGet = useNewApi({
        method: "GET",
        url: rotasApi.tamanho.obter,
    });

    const apiCreate = useNewApi({
        method: "POST",
        url: rotasApi.tamanho.create,
    });

    const apiUpdate = useNewApi({
        method: "PUT",
        url: rotasApi.tamanho.update,
    });

    async function obter(id: string): Promise<ITamanho | undefined> {
        return await apiGet.fecth({ urlParams: `?id=${id}` });
    }

    async function create(
        body: Partial<ITamanho>
    ): Promise<ITamanho | undefined> {
        return await apiCreate.fecth({ body });
    }

    async function update(
        body: Partial<ITamanho>
    ): Promise<ITamanho | undefined> {
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
