import { useNewApi } from "../hooks/use-new-api";
import { IBanner } from "../types/banner";

export function useApiBanner() {
    const apiGet = useNewApi({
        method: "GET",
        url: "/banners/get-banner?id=",
    });

    const apiCreate = useNewApi({
        method: "POST",
        url: "/banners/create",
    });

    const apiUpdate = useNewApi({
        method: "PUT",
        url: "/banners/update",
    });

    async function obter(id: string): Promise<IBanner | undefined> {
        return await apiGet.fecth({ urlParams: id });
    }

    async function create(body: Partial<IBanner>): Promise<IBanner | undefined> {
        return await apiCreate.fecth({ body });
    }

    async function update(body: Partial<IBanner>): Promise<IBanner | undefined> {
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
