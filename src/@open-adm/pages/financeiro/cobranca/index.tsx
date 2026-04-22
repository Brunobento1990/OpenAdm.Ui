'use client'

import Badge from 'src/@core/theme/overrides/badge'
import { StatusApp } from 'src/@open-adm/components/chip'
import { TableIndex } from 'src/@open-adm/components/table-paginacao'
import { formatMoney } from 'src/@open-adm/utils/format-money'

export function ParcelaCobrancaPaginacao() {
  return (
    <>
      <TableIndex
        columns={[
          {
            field: 'referente',
            headerName: 'Referente',
            cellRenderer: (row: { data: any }) => `${row.data?.mesCobranca || ''}/${row.data?.anoCobranca || ''}`
          },
          {
            field: 'valor',
            headerName: 'Valor',
            cellRenderer: (row: { data: any }) => `${formatMoney(row.data.valor) || ''}`
          },
          {
            field: 'valorPago',
            headerName: 'Valor pago',
            cellRenderer: (row: { data: any }) => `${formatMoney(row.data.valorPago) || ''}`
          },
          {
            field: 'status',
            headerName: 'Status',
            cellRenderer: (row: { data: any }) => {
              const cor = row.data?.pago ? 'success' : row.data?.vencido ? 'error' : 'warning'
              const titulo = row.data?.pago ? 'Pago' : row.data?.vencido ? 'Vencido' : 'Pendente'

              return <StatusApp cor={cor} titulo={titulo} width='100px' />
            }
          }
        ]}
        url='parcela-cobranca/paginacao'
        nomeDaTabela='parcela-cobranca'
        urlView='/financeiro/cobranca/visualizar'
      />
    </>
  )
}
