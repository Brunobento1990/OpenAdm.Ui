import { rotasApi } from "src/configs/rotasApi";
import { useNewApi } from "../hooks/use-new-api";
import { ILojasParceiras } from "../types/lojas-parceiras";


export function useApiLojasParceiras() {
    const apiCreate = useNewApi({
        method: "POST",
        url: rotasApi.lojasParceiras.create,
    });

    const apiUpdate = useNewApi({
        method: "PUT",
        url: rotasApi.lojasParceiras.update,
    });

    const apiGet = useNewApi({
        method: "GET",
        url: rotasApi.lojasParceiras.obter,
    });

    async function obter(id: string): Promise<ILojasParceiras | undefined> {
        return await apiGet.fecth({ urlParams: `?id=${id}` });
    }

    async function create(
        body: Partial<ILojasParceiras>
    ): Promise<ILojasParceiras | undefined> {
        return await apiCreate.fecth({ body });
    }

    async function update(
        body: Partial<ILojasParceiras>
    ): Promise<ILojasParceiras | undefined> {
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
