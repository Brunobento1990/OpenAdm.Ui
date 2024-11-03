import { useNewApi } from "../hooks/use-new-api";
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
        excluirFatura
    }
}