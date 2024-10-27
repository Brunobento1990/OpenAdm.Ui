import { useNewApi } from "src/@open-adm/hooks/use-new-api";
import { IFaturaContasAReceber, IPagarFaturaAReceber } from "src/@open-adm/types/contas-a-receber";

export function useContasAReceber() {
    const apiParcelasPorPedido = useNewApi({
        method: 'GET',
        url: 'parcela/pedido?pedidoId=',
        notAlert: true
    });

    const apiGet = useNewApi({
        method: 'GET',
        url: 'parcela/get-by-id?id=',
        notAlert: true
    });

    const apiPagarFatura = useNewApi({
        method: 'PUT',
        url: 'parcela/pagar',
        notAlert: true
    });

    const apiEdit = useNewApi({
        method: 'PUT',
        url: 'parcela/edit'
    });

    async function parcelasDoPedido(pedidoId: string, statusFatura?: number): Promise<IFaturaContasAReceber[] | undefined> {
        return await apiParcelasPorPedido.fecth<IFaturaContasAReceber[]>({ urlParams: `${pedidoId}&statusFatura=${statusFatura ?? '0'}` })
    }

    async function get(id: string): Promise<IFaturaContasAReceber | undefined> {
        return await apiGet.fecth<IFaturaContasAReceber>({ urlParams: id })
    }

    async function pagar(body: IPagarFaturaAReceber): Promise<IFaturaContasAReceber | undefined> {
        return await apiPagarFatura.fecth<IFaturaContasAReceber>({ body })
    }

    async function edit(body: Partial<IFaturaContasAReceber>): Promise<IFaturaContasAReceber | undefined> {
        return await apiEdit.fecth<IFaturaContasAReceber>({ body })
    }

    return {
        parcelasDoPedido,
        pagar,
        get,
        edit
    }
}