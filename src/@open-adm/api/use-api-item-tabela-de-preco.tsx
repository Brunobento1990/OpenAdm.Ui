import { useNewApi } from "../hooks/use-new-api";
import { IAtualizarPrecoPorPeso } from "../types/atualizar-preco-por-peso";
import { IAtualizarPrecoPorTamanho } from "../types/atualizar-preco-por-tamanho";

export function useApiItemTabelaDePreco() {
    const apiPrecoPorTamanho = useNewApi({
        method: 'PUT',
        url: 'item-tabela-de-preco/atualizar-por-tamanho'
    })

    const apiPrecoPorPeso = useNewApi({
        method: 'PUT',
        url: 'item-tabela-de-preco/atualizar-por-peso'
    })

    async function atualizarPorTamanho(body: Partial<IAtualizarPrecoPorTamanho>): Promise<any> {
        return await apiPrecoPorTamanho.fecth({ body, message: "Preços atualizados com sucesso" })
    }

    async function atualizarPorPeso(body: Partial<IAtualizarPrecoPorPeso>): Promise<any> {
        return await apiPrecoPorPeso.fecth({ body, message: "Preços atualizados com sucesso" })
    }

    return {
        atualizarPorPeso: {
            fetch: atualizarPorPeso,
            status: apiPrecoPorPeso.statusRequisicao
        },
        atualizarPorTamanho: {
            fetch: atualizarPorTamanho,
            status: apiPrecoPorTamanho.statusRequisicao
        }
    }
}