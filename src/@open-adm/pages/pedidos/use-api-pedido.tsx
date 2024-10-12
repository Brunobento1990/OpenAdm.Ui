import { useNewApi } from "src/@open-adm/hooks/use-new-api";
import { IAtualizarStatusPedido, IPedido } from "src/@open-adm/types/pedido";

export function useApiPedido() {
    const apiGet = useNewApi({
        method: 'GET',
        url: 'pedidos/get?pedidoId=',
        notAlert: true
    })

    const apiAtualizarStatus = useNewApi({
        method: 'PUT',
        url: 'pedidos/update-status',
        notAlert: true
    });

    async function get(id: string): Promise<IPedido | undefined> {
        return await apiGet.fecth<IPedido>({ urlParams: id })
    }

    async function atualizarStatus(body: IAtualizarStatusPedido): Promise<any> {
        return await apiAtualizarStatus.fecth({ body })
    }

    return {
        get,
        atualizarStatus
    }
}