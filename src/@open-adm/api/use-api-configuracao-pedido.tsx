import { rotasApi } from "src/configs/rotasApi";
import { useNewApi } from "../hooks/use-new-api";
import { IConfiguracaoDePedido } from "../types/configuracao-pedido";


export function useApiConfiguracaoPedido() {
    const apiUpdate = useNewApi({
        method: "PUT",
        url: rotasApi.configuracaoPedido.create,
    });

    const apiObter = useNewApi({
        method: "GET",
        url: rotasApi.configuracaoPedido.obter,
        naoRenderizarErro: true,
    });

    async function update(
        body: Partial<IConfiguracaoDePedido>
    ): Promise<IConfiguracaoDePedido | undefined> {
        return await apiUpdate.fecth({
            body,
            message: "Configuração atualizada com sucesso",
        });
    }

    async function obter(): Promise<IConfiguracaoDePedido | undefined> {
        return await apiObter.fecth();
    }

    return {
        obter: {
            fetch: obter,
            status: apiObter.statusRequisicao,
        },
        update: {
            fetch: update,
            status: apiUpdate.statusRequisicao,
        },
    };
}
