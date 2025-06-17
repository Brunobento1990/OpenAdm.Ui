import { rotasApi } from "src/configs/rotasApi";
import { useNewApi } from "../hooks/use-new-api";
import { IProduto } from "../types/produto";

export function useApiProduto() {
    const apiGet = useNewApi({
        method: "GET",
        url: rotasApi.produto.obter,
    });

    const apiCreate = useNewApi({
        method: "POST",
        url: rotasApi.produto.create,
    });

    const apiUpdate = useNewApi({
        method: "PUT",
        url: rotasApi.produto.update,
    });

    const apiInativar = useNewApi({
        method: "PUT",
        url: rotasApi.produto.inativar,
    });

    async function obter(id: string): Promise<IProduto | undefined> {
        return await apiGet.fecth({ urlParams: `?id=${id}` });
    }

    async function create(
        body: Partial<IProduto>
    ): Promise<IProduto | undefined> {
        return await apiCreate.fecth({ body });
    }

    async function update(
        body: Partial<IProduto>
    ): Promise<IProduto | undefined> {
        return await apiUpdate.fecth({ body });
    }

    async function inativar(id: string): Promise<any> {
        return await apiInativar.fecth({
            urlParams: id,
            message: "Produto inativado com sucesso",
        });
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
        inativar: {
            fetch: inativar,
            status: apiInativar.statusRequisicao,
        },
    };
}
