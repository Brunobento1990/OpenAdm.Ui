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
import { InputDate } from 'src/@open-adm/components/input/input-date'
import { FormRow } from 'src/@open-adm/components/form/row'
import { FormItemRow } from 'src/@open-adm/components/form/item-row'
import { DropDownApp } from 'src/@open-adm/components/drop-down/drop-down-app'

interface propsFaturaPaginacao {
  tipo: TipoFaturaEnum
  urlView: string
  urlEdit: string
  urlAdd: string
}

interface ParcelaCellRendererParams {
  data: IParcelaPaginacaoResponse
}

interface IFiltroFatura {
  dataVencimentoInicial?: string
  dataVencimentoFinal?: string
  quitada?: boolean
}

interface FiltroVencimentoFaturaProps {
  filtros: IFiltroFatura
  setFiltros: (filtros: IFiltroFatura) => void
}

const statusParcela = {
  [StatusParcelaEnum.Pendente]: { titulo: 'Pendente', cor: 'warning' },
  [StatusParcelaEnum.PagoParcial]: { titulo: 'Pago parcial', cor: 'info' },
  [StatusParcelaEnum.Pago]: { titulo: 'Pago', cor: 'success' }
} as const

const opcoesSituacaoFatura = [
  { id: undefined, descricao: 'Todas' },
  { id: false, descricao: 'Pendentes' },
  { id: true, descricao: 'Quitadas' }
]

export function FaturaPaginacao(props: propsFaturaPaginacao) {
  const { navigate, query } = useNavigateApp()
  const { estornarParcela } = useApiParcela()
  const { show, close } = useModal()
  const [refreshPai, setRefreshPai] = useState(false)
  const [filtros, setFiltros] = useState<IFiltroFatura>({})
  const pedidoId = typeof query.pedidoId === 'string' ? query.pedidoId : undefined

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
      filtroChildren={<FiltroVencimentoFatura filtros={filtros} setFiltros={setFiltros} />}
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
          cellRenderer: (params: ParcelaCellRendererParams) => formatMoney(params.data.valor)
        },
        {
          width: 130,
          field: 'valorPagoRecebido',
          headerName: 'Valor pago',
          cellRenderer: (params: ParcelaCellRendererParams) => formatMoney(params.data.valorPagoRecebidoLiquido)
        },
        {
          width: 130,
          field: 'desconto',
          headerName: 'Desc. concedido',
          cellRenderer: (params: ParcelaCellRendererParams) => formatMoney(params.data.descontoConcedido)
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
      desabilitarColunaAcoes
      refreshPai={`${refreshPai}-${pedidoId ?? ''}`}
      nomeDaTabela='fatura'
      filtroComplementar={{
        tipo: props.tipo,
        dataVencimentoInicial: filtros.dataVencimentoInicial,
        dataVencimentoFinal: filtros.dataVencimentoFinal,
        quitada: filtros.quitada,
        pedidoId
      }}
    />
  )
}

function FiltroVencimentoFatura(props: FiltroVencimentoFaturaProps) {
  return (
    <FormRow marginBottom='1rem'>
      <FormItemRow xs={12} sm={4}>
        <InputDate
          id='dataVencimentoInicial'
          name='dataVencimentoInicial'
          label='Vencimento inicial'
          value={props.filtros.dataVencimentoInicial}
          onChange={(_, value) => props.setFiltros({ ...props.filtros, dataVencimentoInicial: value })}
        />
      </FormItemRow>
      <FormItemRow xs={12} sm={4}>
        <InputDate
          id='dataVencimentoFinal'
          name='dataVencimentoFinal'
          label='Vencimento final'
          value={props.filtros.dataVencimentoFinal}
          onChange={(_, value) => props.setFiltros({ ...props.filtros, dataVencimentoFinal: value })}
        />
      </FormItemRow>
      <FormItemRow xs={12} sm={4}>
        <DropDownApp
          id='quitada'
          keyLabel='descricao'
          label='Situação'
          values={opcoesSituacaoFatura}
          value={opcoesSituacaoFatura.find(opcao => opcao.id === props.filtros.quitada)}
          onChange={(_, value) => props.setFiltros({ ...props.filtros, quitada: value })}
        />
      </FormItemRow>
    </FormRow>
  )
}
