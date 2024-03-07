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
        }
      ]
    }
  ]
}

export default navigation
