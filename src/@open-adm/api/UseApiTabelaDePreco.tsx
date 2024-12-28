import { useNewApi } from '../hooks/use-new-api'
import { ITabelaDePreco } from 'src/@open-adm/types/tabela-de-preco'

export function useApiTabelaDePreco() {
  const apiTabelaDePrecoPadraoEcommerce = useNewApi({
    method: 'GET',
    url: 'tabelas-de-precos/get-tabela-ativa',
    notAlert: true
  })

  async function tabelaDePrecoEcommerce(): Promise<ITabelaDePreco | undefined> {
    return await apiTabelaDePrecoPadraoEcommerce.fecth()
  }

  return {
    tabelaDePrecoEcommerce
  }
}
