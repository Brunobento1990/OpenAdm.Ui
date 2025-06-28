// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'clarity:home-line',
    },
    {
      title: 'Ecommerce',
      icon: 'icon-park-outline:shopping',
      children: [
        {
          title: 'Banners',
          path: '/banners',
          icon: 'material-symbols-light:planner-banner-ad-pt-outline',
        },
        {
          title: 'Lojas parceiras',
          path: '/lojas-parceiras',
          icon: 'mdi:store-check-outline'
        },
      ]
    },
    {
      title: 'Estoque',
      icon: 'healthicons:stock-out-outline',
      children: [
        {
          'title': 'Categoria',
          'path': '/estoque/categoria',
          'icon': 'mdi:category-outline'
        },
        {
          'title': 'Produto',
          'path': '/estoque/produto',
          'icon': 'fluent-mdl2:product-variant'
        },
        {
          'title': 'Peso',
          'path': '/estoque/peso',
          'icon': 'game-icons:weight'
        },
        {
          'title': 'Tamanho',
          'path': '/estoque/tamanho',
          'icon': 'bx:font-size'
        },
        {
          title: 'Movimento produto',
          path: '/estoque/movimentacao-produto',
          icon: 'arcticons:stockswidget'
        },
        {
          title: 'Posição estoque',
          path: '/estoque/posicao-estoque',
          icon: 'icon-park-outline:database-position'
        },
        {
          title: 'Relatórios',
          icon: "mdi:report-finance",
          children: [
            {
              title: 'Relatório de estoque',
              icon: "tabler:report-search",
              path: '/estoque/relatorio-estoque'
            },
            {
              title: 'Relatório de produção',
              icon: "simple-icons:soundcharts",
              path: '/estoque/relatorio-producao'
            },
          ]
        },
      ]
    },
    {
      'title': 'Vendas',
      'icon': 'carbon:sales-ops',
      'children': [
        {
          title: 'Pedidos',
          path: '/pedidos',
          icon: 'material-symbols:order-approve-outline',
        },
        {
          title: 'Tabela de preço',
          icon: 'solar:tag-price-bold',
          path: '/vendas/tabeladepreco'
        },
        {
          title: 'Relatório por período',
          icon: "tabler:report-search",
          path: '/vendas/relatorio-por-periodo'
        },
        {
          title: 'Clientes',
          icon: "solar:user-id-linear",
          path: '/vendas/cliente'
        }
      ]
    },
    {
      'title': 'Configurações',
      'icon': 'iwwa:settings',
      children: [
        {
          title: 'Minha empresa',
          icon: 'mdi:company',
          path: '/configuracao/minha-empresa'
        },
        {
          title: 'Pedidos',
          path: '/configuracao/pedido',
          icon: 'material-symbols:order-approve-outline',
        },
        {
          title: "Mercado pago",
          path: "/configuracao/mercado-pago",
          icon: "simple-icons:mercadopago"
        },
        {
          title: "Frete",
          path: "/configuracao/frete",
          icon: "fluent:vehicle-truck-cube-24-regular"
        }
      ]
    },
    {
      title: 'Financeiro',
      icon: 'rivet-icons:money',
      children: [
        {
          title: 'Contas a receber',
          icon: 'game-icons:receive-money',
          path: '/financeiro/contas-a-receber'
        },
        {
          title: 'Contas a pagar',
          icon: 'game-icons:pay-money',
          path: '/financeiro/contas-a-pagar'
        },
        {
          title: 'Transações',
          icon: 'grommet-icons:transaction',
          path: '/financeiro/transacao-financeira'
        }
      ]
    }
  ]
}

export default navigation
