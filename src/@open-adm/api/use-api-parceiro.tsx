import { rotasApi } from "src/configs/rotasApi";
import { useNewApi } from "../hooks/use-new-api";
import { IParceiro } from "../types/parceiro";


export function useApiParceiro() {
    const apiObter = useNewApi({
        method: "GET",
        url: rotasApi.parceiro.obter,
    });

    const apiEditar = useNewApi({
        method: "PUT",
        url: rotasApi.parceiro.editar,
    });

    const apiDeleteRedeSocial = useNewApi({
        method: "DELETE",
        url: rotasApi.parceiro.excluirRedeSocial,
    });

    const apiDeleteTelefone = useNewApi({
        method: "DELETE",
        url: rotasApi.parceiro.excluirTelefone,
    });

    async function obter(): Promise<IParceiro | undefined> {
        return await apiObter.fecth();
    }

    async function editar(
        body: Partial<IParceiro>
    ): Promise<IParceiro | undefined> {
        return await apiEditar.fecth({ body });
    }

    async function excluirRedeSocial(redeSocialId: string): Promise<any> {
        return await apiDeleteRedeSocial.fecth({
            urlParams: `?redeSocialId=${redeSocialId}`,
        });
    }

    async function excluirTelefone(telefoneId: string): Promise<any> {
        return await apiDeleteTelefone.fecth({
            urlParams: `?telefoneId=${telefoneId}`,
        });
    }

    return {
        obter: {
            fetch: obter,
            status: apiObter.statusRequisicao,
        },
        editar: {
            fetch: editar,
            status: apiEditar.statusRequisicao,
        },
        excluirRedeSocial: {
            fetch: excluirRedeSocial,
            status: apiDeleteRedeSocial.statusRequisicao,
        },
        excluirTelefone: {
            fetch: excluirTelefone,
            status: apiDeleteTelefone.statusRequisicao,
        },
    };
}
