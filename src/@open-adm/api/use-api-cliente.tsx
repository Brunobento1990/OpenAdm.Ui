import { rotasApi } from "src/configs/rotasApi";
import { useNewApi } from "../hooks/use-new-api";
import { ICliente } from "../types/cliente";
import { IAtualizarSenhaUsuarioAdm } from "../types/atualizar-senha-usuario-adm";


export function useApiCliente() {
    const apiCreate = useNewApi({
        method: "POST",
        url: rotasApi.cliente.create,
    });

    const apiAtualizarSenha = useNewApi({
        method: "POST",
        url: rotasApi.cliente.atualizarSenha,
    });

    const apiGet = useNewApi({
        method: "GET",
        url: rotasApi.cliente.obter,
    });

    async function create(
        body: Partial<ICliente>
    ): Promise<ICliente | undefined> {
        return await apiCreate.fecth({
            body,
        });
    }

    async function get(id: string): Promise<ICliente | undefined> {
        return await apiGet.fecth<ICliente>({
            urlParams: id,
        });
    }

    async function atualizarSenha(body: IAtualizarSenhaUsuarioAdm): Promise<any> {
        return await apiAtualizarSenha.fecth({
            body,
            message: "Senha atualizada com sucesso",
        });
    }

    return {
        create: {
            fecth: create,
            status: apiCreate.statusRequisicao,
        },
        get: {
            fetch: get,
            status: apiGet.statusRequisicao,
        },
        atualizarSenha: {
            fetch: atualizarSenha,
            status: apiAtualizarSenha.statusRequisicao,
        },
    };
}
