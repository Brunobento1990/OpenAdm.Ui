import { useEffect, useState } from 'react'
import { FormItemRow } from 'src/@open-adm/components/form/item-row'
import { FormRow } from 'src/@open-adm/components/form/row'
import { TableIndex } from 'src/@open-adm/components/table-paginacao'
import { opcoesStatusPedido } from 'src/@open-adm/enuns/status-pedido'
import { DropDownApp } from 'src/@open-adm/components/drop-down/drop-down-app'
import { useLocalStorage } from 'src/hooks/useLocalStorage'
import { useConfig } from './config'

const opcoesFiltroStatusPedido = [{ id: undefined, label: 'Todos' }, ...opcoesStatusPedido]
const CHAVE_FILTRO_STATUS_PEDIDO = 'pedidos-filtro-status'

export function Pedidos() {
  const [status, setStatus] = useState<number>()
  const [filtroCarregado, setFiltroCarregado] = useState(false)
  const { getItem, remove, setItem } = useLocalStorage()
  const config = useConfig()

  useEffect(() => {
    const statusSalvo = Number(getItem<string>(CHAVE_FILTRO_STATUS_PEDIDO))
    const statusValido = opcoesStatusPedido.some(opcao => opcao.id === statusSalvo)

    if (statusValido) {
      setStatus(statusSalvo)
    }

    setFiltroCarregado(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function alterarStatus(novoStatus?: number) {
    setStatus(novoStatus)

    if (novoStatus === undefined) {
      remove(CHAVE_FILTRO_STATUS_PEDIDO)
      return
    }

    setItem(CHAVE_FILTRO_STATUS_PEDIDO, novoStatus.toString())
  }

  if (!filtroCarregado) {
    return null
  }

  return (
    <TableIndex
      columns={config.columns}
      url='pedidos/paginacao'
      urlDelete='pedidos/delete'
      urlView='pedidos/view'
      urlAdd='pedidos/create'
      filtroChildren={
        <FormRow marginBottom='1rem'>
          <FormItemRow xs={12} sm={12}>
            <DropDownApp
              id='statusPedido'
              keyLabel='label'
              label='Status'
              values={opcoesFiltroStatusPedido}
              value={opcoesFiltroStatusPedido.find(opcao => opcao.id === status)}
              onChange={(_, value) => alterarStatus(value)}
            />
          </FormItemRow>
        </FormRow>
      }
      filtroComplementar={{
        statusPedido: status
      }}
      nomeDaTabela='pedidos'
    />
  )
}
