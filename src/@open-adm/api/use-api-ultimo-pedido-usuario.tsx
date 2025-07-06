import { useNewApi } from "../hooks/use-new-api";
import { IPaginacaoUltimoPedidoUsuario } from "../types/ultimo-pedido-usuario";

export function useApiUltimoPedidoUsuario() {
    const api = useNewApi({
        method: 'GET',
        url: 'ultimos-pedidos',
        statusInicial: 'loading'
    })

    async function listar(page: number, isJuridico: boolean, search?: string): Promise<IPaginacaoUltimoPedidoUsuario | undefined> {
        return await api.fecth({
            urlParams: `?page=${page}&isJuridico=${isJuridico}&search=${search ?? ""}`
        })
    }

    return {
        listar: {
            fetch: listar,
            status: api.statusRequisicao
        }
    }
}