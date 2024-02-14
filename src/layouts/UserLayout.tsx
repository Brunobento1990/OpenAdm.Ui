import { ReactNode } from 'react'
import { Theme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import Layout from 'src/@core/layouts/Layout'
import VerticalNavItems from 'src/navigation/vertical'
import VerticalAppBarContent from './components/vertical/AppBarContent'
import { useSettings } from 'src/@core/hooks/useSettings'

interface Props {
  children: ReactNode
  contentHeightFixed?: boolean
}

const UserLayout = ({ children, contentHeightFixed }: Props) => {

  const { settings, saveSettings } = useSettings()

  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  if (hidden && settings.layout === 'horizontal') {
    settings.layout = 'vertical'
  }

  return (
    <Layout
      hidden={hidden}
      settings={settings}
      saveSettings={saveSettings}
      contentHeightFixed={contentHeightFixed}
      verticalLayoutProps={{
        navMenu: {
          navItems: VerticalNavItems()
        },
        appBar: {
          content: props => (
            <VerticalAppBarContent
              hidden={hidden}
              settings={settings}
              saveSettings={saveSettings}
              toggleNavVisibility={props.toggleNavVisibility}
            />
          )
        }
      }}
    >
      {children}
    </Layout>
  )
}

export default UserLayout
