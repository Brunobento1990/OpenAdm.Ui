import { rotasApi } from "src/configs/rotasApi";
import { useNewApi } from "../hooks/use-new-api";
import { IConfiguracaoDeEmail } from "../types/configuracao-email";


export function useApiConfiguracaoEmail() {
    const createApi = useNewApi({
        method: "POST",
        url: rotasApi.configuracaoEmail.create,
    });

    const apiObter = useNewApi({
        method: "GET",
        url: rotasApi.configuracaoEmail.obter,
        naoRenderizarErro: true,
    });

    async function obter(): Promise<IConfiguracaoDeEmail | undefined> {
        return await apiObter.fecth();
    }

    async function criar(
        body: Partial<IConfiguracaoDeEmail>
    ): Promise<IConfiguracaoDeEmail | undefined> {
        return await createApi.fecth({
            body,
            message: "Configuração atualizada com sucesso",
        });
    }

    return {
        obter: {
            fetch: obter,
            status: apiObter.statusRequisicao,
        },
        create: {
            fetch: criar,
            status: createApi.statusRequisicao,
        },
    };
}
