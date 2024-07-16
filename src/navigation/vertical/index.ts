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
      title: 'Pedidos',
      path: '/pedidos',
      icon: 'material-symbols:order-approve-outline',
    },
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
        }
      ]
    },
    {
      'title': 'Vendas',
      'icon': 'carbon:sales-ops',
      'children': [
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
          title: 'E-mail',
          icon: 'iconamoon:email-thin',
          path: '/configuracao/email'
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
    }
  ]
}

export default navigation
