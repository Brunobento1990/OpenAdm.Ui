import { useNewApi } from 'src/@open-adm/hooks/use-new-api'
import { IConfiguracaoDeFrete } from 'src/@open-adm/types/configuracao-de-frete'

export function useApiConfiguracaoDeFrete() {
  const apiCreate = useNewApi({
    method: 'POST',
    url: 'configuracao-de-frete'
  })

  const apiGet = useNewApi({
    method: 'GET',
    url: 'configuracao-de-frete',
    naoRenderizarResposta: true
  })

  async function create(body: Partial<IConfiguracaoDeFrete>): Promise<IConfiguracaoDeFrete | undefined> {
    return await apiCreate.fecth<IConfiguracaoDeFrete>({
      body,
      message: 'Registro atualizado com sucesso!'
    })
  }

  async function get(): Promise<IConfiguracaoDeFrete | undefined> {
    return await apiGet.fecth<IConfiguracaoDeFrete>()
  }

  return {
    create: {
      fetch: create,
      loading: apiCreate.loading
    },
    get: {
      fetch: get,
      loading: apiGet.loading
    }
  }
}
