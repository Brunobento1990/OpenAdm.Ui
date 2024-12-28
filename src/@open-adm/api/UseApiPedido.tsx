import { useNewApi } from "../hooks/use-new-api";
import { IAtualizarStatusPedido, IPedido, IPedidoCreate } from "../types/pedido";

export function useApiPedido() {
    const apiCreateAdm = useNewApi({
        method: 'POST',
        url: 'pedidos-adm/create'
    })

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

    async function criarPedido(body: IPedidoCreate): Promise<any> {
        return await apiCreateAdm.fecth({ body })
    }

    return {
        criarPedido,
        get,
        atualizarStatus
    }
}