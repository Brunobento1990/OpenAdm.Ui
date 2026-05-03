import { Grid } from '@mui/material'
import dynamic from 'next/dynamic'
import { useTheme } from '@mui/material/styles'
import { useState, useEffect } from 'react'
import { BoxApp } from 'src/@open-adm/components/box'
import { GraficoVelaVertical } from 'src/@open-adm/components/graficos/grafico-vela-vertical'
import { GridApp, GridItemApp } from 'src/@open-adm/components/grid'
import { LoadingAppTexto } from 'src/@open-adm/components/loading/loading-app-texto'
import { useNavigateApp } from 'src/@open-adm/hooks/use-navigate-app'
import { useNewApi } from 'src/@open-adm/hooks/use-new-api'
import { IHome } from 'src/@open-adm/types/home'
import { CardTotalizador } from 'src/@open-adm/views/home/card-totalizador'
import StatusPedidoHome from 'src/@open-adm/views/home/pedidos-em-aberto-grafico'
import { rotasApp } from 'src/configs/rotasApp'
import { GraficoVelaVerticalAgrupado } from 'src/@open-adm/components/graficos/grafico-vela-vertical-agrupada'

const TotalUsuario = dynamic(() => import('src/@open-adm/views/home/total-usuarios'), {
  ssr: false
})

const AcessoUsuarioEcommerce = dynamic(() => import('src/@open-adm/views/home/acesso-usuario-ecommerce'), {
  ssr: false
})

const EstoquesHome = dynamic(() => import('src/@open-adm/views/home/estoques-home'), {
  ssr: false
})

const ClientesSemPedidoHome = dynamic(() => import('src/@open-adm/views/home/clientes-sem-pedido-home'), {
  ssr: false
})

const VariacaoMensalPedidoHome = dynamic(() => import('src/@open-adm/views/home/variacao-mensal-pedido-home'), {
  ssr: false
})

const FaturasTotalizador = dynamic(() => import('src/@open-adm/views/home/totalizacao-faturas'), {
  ssr: false
})

export function HomePage() {
  const { navigate } = useNavigateApp()
  const { palette } = useTheme()
  const { fecth, statusRequisicao } = useNewApi({
    method: 'GET',
    url: 'home/adm',
    naoRenderizarResposta: true,
    statusInicial: 'loading'
  })
  const [home, setHome] = useState<IHome>()

  async function init() {
    const response = await fecth<IHome>()
    if (response) setHome(response)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <>
      {statusRequisicao === 'loading' && <LoadingAppTexto comBox />}
      <BoxApp padding='1rem' display='flex' flexDirection='column' gap='1rem'>
        <GridApp container>
          <GridItemApp item xs={12} sm={3}>
            <VariacaoMensalPedidoHome variacaoMensalPedido={home?.variacaoMensalPedido} />
          </GridItemApp>
          <GridItemApp item xs={12} sm={3}>
            <CardTotalizador
              total={home?.totalProdutoEstoque ?? 0}
              titulo='Produtos em estoque'
              color={palette.success.main}
              icon='lsicon:management-stockout-outline'
            />
          </GridItemApp>
          <GridItemApp item xs={12} sm={3}>
            <CardTotalizador
              total={home?.totalProdutoEstoqueReservado ?? 0}
              titulo='Produtos reservados'
              color={palette.warning.main}
              icon='icon-park-outline:shopping'
            />
          </GridItemApp>
          <GridItemApp item xs={12} sm={3}>
            <CardTotalizador
              total={home?.quantidadeProdutoDisponivel ?? 0}
              titulo='Produtos disponíveis'
              color={palette.info.main}
              icon='proicons:info'
            />
          </GridItemApp>
        </GridApp>
        <GridApp container>
          <GridItemApp xs={12} item sm={6}>
            <StatusPedidoHome pedidos={home?.statusPedido ?? []} />
          </GridItemApp>
          <GridItemApp xs={12} item sm={6}>
            <GraficoVelaVertical
              dados={
                home?.pedidosPorDia?.map(x => {
                  return {
                    ...x,
                    descricaoDia: x.diaSemana
                  }
                }) || []
              }
              subTitulo='Pedido gerador por dia'
              titulo='Volume por Dia'
            />
          </GridItemApp>
        </GridApp>
        <GridApp container spacing={3}>
          <GridItemApp xs={12} sm={6}>
            <GraficoVelaVerticalAgrupado
              dados={home?.movimentos || []}
              subTitulo='Por categoria'
              titulo={`Movimentação de produtos`}
            />
          </GridItemApp>
        </GridApp>
      </BoxApp>
      <BoxApp padding='1rem' display='flex' flexDirection='column' gap='1rem'>
        <ClientesSemPedidoHome
          titulo={`${home?.usuarioSemPedidoCnpj?.length ?? 0} Clientes sem pedido CNPJ`}
          cliente={home?.usuarioSemPedidoCnpj ?? []}
        />
        <ClientesSemPedidoHome
          titulo={`${home?.usuarioSemPedidoCpf?.length ?? 0} Clientes sem pedido CPF`}
          cliente={home?.usuarioSemPedidoCpf ?? []}
        />
      </BoxApp>
      <BoxApp padding='1rem'>
        <GridApp container spacing={5}>
          <GridItemApp xs={12} sm={3}>
            <AcessoUsuarioEcommerce total={home?.quantidadeDeAcessoEcommerce ?? 0} />
          </GridItemApp>
          <GridItemApp xs={12} sm={3}>
            <FaturasTotalizador total={home?.totalAReceber ?? 0} />
          </GridItemApp>
          <GridItemApp xs={12} sm={3}>
            <TotalUsuario
              navigate={() => navigate(rotasApp.cliente.ultimosPedidoCnpj)}
              cor='green'
              titulo='Qtd clientes CNPJ'
              total={home?.quantidadeDeUsuarioCnpj ?? 0}
            />
          </GridItemApp>
          <GridItemApp xs={12} sm={3}>
            <TotalUsuario
              navigate={() => navigate(rotasApp.cliente.ultimosPedidoCpf)}
              cor='red'
              titulo='Qtd clientes CPF'
              total={home?.quantidadeDeUsuarioCpf ?? 0}
            />
          </GridItemApp>
        </GridApp>
      </BoxApp>
      <BoxApp padding='1rem'>
        <GridApp container spacing={3}>
          <GridItemApp xs={12} sm={6}>
            <EstoquesHome estoques={home?.produtosMaisVendidos ?? []} titulo='Produtos mais vendidos' />
          </GridItemApp>
          <GridItemApp xs={12} sm={6}>
            <EstoquesHome estoques={home?.produtosMenosVendidos ?? []} titulo='Produtos menos vendidos' />
          </GridItemApp>
        </GridApp>
      </BoxApp>
    </>
  )
}
