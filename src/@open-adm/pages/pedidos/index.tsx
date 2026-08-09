import { useState } from 'react'
import { FormItemRow } from 'src/@open-adm/components/form/item-row'
import { FormRow } from 'src/@open-adm/components/form/row'
import { TableIndex } from 'src/@open-adm/components/table-paginacao'
import { opcoesStatusPedido } from 'src/@open-adm/enuns/status-pedido'
import { DropDownApp } from 'src/@open-adm/components/drop-down/drop-down-app'
import { useConfig } from './config'

const opcoesFiltroStatusPedido = [{ id: undefined, label: 'Todos' }, ...opcoesStatusPedido]

export function Pedidos() {
  const [status, setStatus] = useState<number>()
  const config = useConfig()

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
              onChange={(_, value) => setStatus(value)}
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
