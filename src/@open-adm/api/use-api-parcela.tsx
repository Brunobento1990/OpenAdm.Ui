import { useNewApi } from "../hooks/use-new-api";
import { IPagarParcela, IParcela } from "../types/fatura";

export function useApiParcela() {
    const apiGet = useNewApi({
        method: 'GET',
        url: 'parcela/get-by-id',
        notAlert: true,
    })

    const apiPagar = useNewApi({
        method: 'PUT',
        url: 'parcela/pagar'
    })

    const apiEstorno = useNewApi({
        method: 'PUT',
        url: 'parcela/estornar?parcelaId='
    })

    async function obterParcela(id: string): Promise<IParcela | undefined> {
        return await apiGet.fecth({
            urlParams: `?id=${id}`
        })
    }

    async function pagarParcela(pagarParcela: IPagarParcela): Promise<IParcela | undefined> {
        return await apiPagar.fecth({ body: pagarParcela, message: 'Parcela paga com sucesso!' })
    }

    async function estornarParcela(id: string): Promise<any> {
        return await apiEstorno.fecth({ urlParams: id, message: 'Estorno efetuado com sucesso!' })
    }

    return {
        obterParcela,
        pagarParcela,
        estornarParcela
    }
}