import { useNewApi } from "../hooks/use-new-api";
import { IFaturaContasAReceber, IPagarFaturaAReceber } from "../types/contas-a-receber";
import { IFatura, IParcela } from "../types/fatura";

export function useApiFatura() {
    const editarParcelaApi = useNewApi({
        method: 'PUT',
        url: 'parcela/editar-parcela'
    })

    const addParcelaApi = useNewApi({
        method: 'POST',
        url: 'parcela/nova-parcela'
    })

    const excluirParcelaApi = useNewApi({
        method: 'DELETE',
        url: 'parcela/excluir?id='
    })

    const apiGetFatura = useNewApi({
        method: 'GET',
        url: 'fatura/get?id=',
        notAlert: true
    })

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

    async function editarParcela(body: IParcela): Promise<IParcela | undefined> {
        return await editarParcelaApi.fecth({ body })
    }

    async function adicionarParcela(body: IParcela): Promise<IParcela | undefined> {
        return await addParcelaApi.fecth({ body })
    }

    async function getFatura(id: string): Promise<IFatura | undefined> {
        return await apiGetFatura.fecth({ urlParams: id })
    }

    async function excluirFatura(id: string): Promise<any | undefined> {
        return await excluirParcelaApi.fecth({ urlParams: id })
    }

    return {
        editarParcela,
        getFatura,
        adicionarParcela,
        excluirFatura,
        parcelasDoPedido,
        pagar,
        get,
        edit
    }
}