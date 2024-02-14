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
  ]
}

export default navigation
