import { formatMoney } from 'src/@open-adm/utils/format-money'
import { StatusApp } from 'src/@open-adm/components/chip'
import { formatDate } from 'src/@open-adm/utils/convert-date'
import { TableIndex } from 'src/@open-adm/components/table-paginacao'
import { useNavigateApp } from 'src/@open-adm/hooks/use-navigate-app'
import { IconButton } from '@mui/material'
import IconifyIcon from 'src/@core/components/icon'
import { useApiParcela } from 'src/@open-adm/api/use-api-parcela'
import { IParcelaPaginacaoResponse } from 'src/@open-adm/types/fatura'
import { TipoFaturaEnum } from 'src/@open-adm/enuns/tipo-fatura-enum'
import { StatusParcelaEnum } from 'src/@open-adm/enuns/status-parcela-enum'
import { useModal } from 'src/@open-adm/components/modal/modal'
import { useState } from 'react'

interface propsFaturaPaginacao {
  tipo: TipoFaturaEnum
  urlView: string
  urlEdit: string
  urlAdd: string
}

interface ParcelaCellRendererParams {
  data: IParcelaPaginacaoResponse
}

const statusParcela = {
  [StatusParcelaEnum.Pendente]: { titulo: 'Pendente', cor: 'warning' },
  [StatusParcelaEnum.PagoParcial]: { titulo: 'Pago parcial', cor: 'info' },
  [StatusParcelaEnum.Pago]: { titulo: 'Pago', cor: 'success' }
} as const

export function FaturaPaginacao(props: propsFaturaPaginacao) {
  const { navigate } = useNavigateApp()
  const { estornarParcela } = useApiParcela()
  const { show, close } = useModal()
  const [refreshPai, setRefreshPai] = useState(false)

  function estornar(parcela: IParcelaPaginacaoResponse) {
    show({
      message: `Confirma o estorno de todos os pagamentos da parcela: ${parcela.numeroDaParcela}?`,
      confirmed: async () => {
        await estornarParcela(parcela.id)
        setRefreshPai(state => !state)
        close()
      }
    })
  }

  return (
    <TableIndex
      minWidth={2500}
      desabilitarColunaNumero
      columns={[
        {
          width: 120,
          field: 'numeroFatura',
          headerName: 'N° fatura',
          sortable: true,
          cellRenderer: (params: ParcelaCellRendererParams) => params.data.numeroFatura
        },
        {
          width: 130,
          field: 'numeroDaParcela',
          headerName: 'N° parcela',
          sortable: true,
          cellRenderer: (params: ParcelaCellRendererParams) => params.data.numeroDaParcela
        },
        {
          width: 130,
          field: 'numeroPedido',
          headerName: 'N° pedido',
          cellRenderer: (params: ParcelaCellRendererParams) => `#${params.data.numeroPedido ?? ''}`
        },
        {
          width: 250,
          field: 'nomeUsuario',
          headerName: 'Cliente',
          cellRenderer: (params: ParcelaCellRendererParams) => params.data.nomeUsuario
        },
        {
          width: 130,
          field: 'valor',
          headerName: 'Valor',
          cellRenderer: (params: ParcelaCellRendererParams) => formatMoney(params.data.valor),
          sortable: true
        },
        {
          width: 130,
          field: 'valorPagoRecebido',
          headerName: 'Valor pago',
          cellRenderer: (params: ParcelaCellRendererParams) => formatMoney(params.data.valorPagoRecebido),
          sortable: true
        },
        {
          width: 140,
          field: 'valorAPagarAReceber',
          headerName: 'Valor a pagar',
          cellRenderer: (params: ParcelaCellRendererParams) => formatMoney(params.data.valorAPagarAReceber),
          sortable: true
        },
        {
          width: 150,
          field: 'vencimento',
          headerName: 'Vencimento',
          cellRenderer: (params: ParcelaCellRendererParams) => formatDate(params.data.vencimento),
          sortable: true
        },
        {
          width: 140,
          field: 'status',
          headerName: 'Status',
          sortable: true,
          cellRenderer: (params: ParcelaCellRendererParams) => {
            const status = statusParcela[params.data.status]

            return <StatusApp cor={status.cor} titulo={status.titulo} />
          }
        },
        {
          width: 100,
          field: 'baixa',
          headerName: 'Baixar',
          cellRenderer: (params: ParcelaCellRendererParams) => {
            if (params.data.quitada) {
              return null
            }

            return (
              <IconButton onClick={() => navigate(`/financeiro/fatura/baixar/${params.data.id}`)}>
                <IconifyIcon icon='fe:app-menu' />
              </IconButton>
            )
          }
        },
        {
          width: 140,
          field: 'estornar',
          headerName: 'Estornar',
          cellRenderer: (params: ParcelaCellRendererParams) => {
            if (params.data.status === StatusParcelaEnum.Pendente) {
              return null
            }

            return (
              <IconButton onClick={() => estornar(params.data)}>
                <IconifyIcon icon='mage:reload-reverse' />
              </IconButton>
            )
          }
        }
      ]}
      url='parcela/paginacao'
    //   urlView={props.urlView}
    //   urlEdit={props.urlEdit}
      urlAdd={props.urlAdd}
      refreshPai={refreshPai}
      nomeDaTabela='fatura'
      filtroComplementar={{
        tipo: props.tipo
      }}
    />
  )
}
