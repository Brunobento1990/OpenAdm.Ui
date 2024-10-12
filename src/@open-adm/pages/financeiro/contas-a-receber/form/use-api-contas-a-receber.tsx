import { useNewApi } from "src/@open-adm/hooks/use-new-api";
import { IFaturaContasAReceber, IPagarFaturaAReceber } from "src/@open-adm/types/contas-a-receber";

export function useContasAReceber() {
    const apiFaturasPorPedido = useNewApi({
        method: 'GET',
        url: 'fatura-contas-a-receber/pedido?pedidoId=',
        notAlert: true
    });

    const apiPagarFatura = useNewApi({
        method: 'PUT',
        url: 'fatura-contas-a-receber/pagar',
        notAlert: true
    });

    async function faturasDoPedido(pedidoId: string, statusFatura?: number): Promise<IFaturaContasAReceber[] | undefined> {
        return await apiFaturasPorPedido.fecth<IFaturaContasAReceber[]>({ urlParams: `${pedidoId}&statusFatura=${statusFatura ?? '0'}` })
    }

    async function pagar(body: IPagarFaturaAReceber): Promise<IFaturaContasAReceber | undefined> {
        return await apiPagarFatura.fecth<IFaturaContasAReceber>({ body })
    }

    return {
        faturasDoPedido,
        pagar
    }
}