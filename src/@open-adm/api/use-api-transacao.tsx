import { useNewApi } from "../hooks/use-new-api";
import { IExtratoTrasacao, ITransacaoFinanceira } from "../types/transacao-financeira";

export function useApiTransacao() {
    const apiPeriodo = useNewApi({
        method: 'POST',
        url: 'transacao-financeira/periodo',
        naoRenderizarResposta: true
    })

    async function extratoPeriodo(body: IExtratoTrasacao): Promise<ITransacaoFinanceira[] | undefined> {
        return await apiPeriodo.fecth({ body })
    }

    return {
        extratoPeriodo
    }
}