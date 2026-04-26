import { useTheme } from '@mui/material/styles'
import { BoxApp } from 'src/@open-adm/components/box'
import { GraficoVelaHorizontal } from 'src/@open-adm/components/graficos/grafico-vela-horizontal'
import { statusPedido } from 'src/@open-adm/enuns/status-pedido'
import { IStatusPedidoHome } from 'src/@open-adm/types/home'

interface propsPedidoEmAbertoGrafico {
  pedidos: IStatusPedidoHome[]
}

const StatusPedidoHome = (props: propsPedidoEmAbertoGrafico) => {
  const { palette } = useTheme() as any

  return (
    <GraficoVelaHorizontal
      dados={props.pedidos.map((x, i) => {
        const status = statusPedido[x.status]
        const cor = palette[status.color]?.main
        return {
          descricao: status.title,
          id: i + 1,
          percentual: x.porcentagem,
          total: x.quantidade,
          cor
        }
      })}
      subTitulo='Distribuição por status'
      titulo='Pedidos'
    />
  )
}

export default StatusPedidoHome
