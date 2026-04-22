import { useNewApi } from '../hooks/use-new-api'
import { IParcelaCobranca } from '../types/parcela-cobranca'

export function useApiParcelaCobranca() {
  const apiObter = useNewApi({
    method: 'GET',
    url: 'parcela-cobranca?id='
  })

  async function obter(id: string): Promise<IParcelaCobranca | undefined> {
    return await apiObter.fecth({
      urlParams: id
    })
  }

  return {
    obter: {
      fetch: obter,
      loading: apiObter.loading
    }
  }
}
