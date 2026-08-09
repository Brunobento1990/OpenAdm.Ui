import { TableIndex } from 'src/@open-adm/components/table-paginacao'
import { formatDate } from 'src/@open-adm/utils/convert-date'
import { formatMoney } from 'src/@open-adm/utils/format-money'

interface IBonificadoPaginacaoResponse {
  id: string
  numeroFatura: number
  numeroPedido: number
  nomeUsuario: string
  total: number
  dataDeCriacao: string
}

interface BonificadoCellRendererParams {
  data: IBonificadoPaginacaoResponse
}

export function BonificadosPaginacao() {
  return (
    <TableIndex
      desabilitarColunaNumero
      desabilitarColunaAcoes
      columns={[
        {
          width: 130,
          field: 'numeroFatura',
          headerName: 'N° fatura',
          sortable: true,
          cellRenderer: (params: BonificadoCellRendererParams) => `#${params.data.numeroFatura}`
        },
        {
          width: 130,
          field: 'numeroPedido',
          headerName: 'N° pedido',
          sortable: true,
          cellRenderer: (params: BonificadoCellRendererParams) => `#${params.data.numeroPedido}`
        },
        {
          width: 300,
          field: 'nomeUsuario',
          headerName: 'Cliente',
          sortable: true,
          cellRenderer: (params: BonificadoCellRendererParams) => params.data.nomeUsuario
        },
        {
          width: 150,
          field: 'total',
          headerName: 'Valor',
          sortable: true,
          cellRenderer: (params: BonificadoCellRendererParams) => formatMoney(params.data.total)
        },
        {
          width: 150,
          field: 'dataDeCriacao',
          headerName: 'Data',
          sortable: true,
          cellRenderer: (params: BonificadoCellRendererParams) => formatDate(params.data.dataDeCriacao)
        }
      ]}
      url='fatura/paginacao/bonificado'
      nomeDaTabela='bonificados'
    />
  )
}
