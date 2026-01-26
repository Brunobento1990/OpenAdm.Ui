import { ReactNode, ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from 'src/hooks/useAuth'
import authConfig from 'src/configs/auth'
import { useLocalStorage } from 'src/hooks/useLocalStorage'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props
  const auth = useAuth()
  const router = useRouter();
  const { getItem } = useLocalStorage();

  useEffect(
    () => {
      if (!router.isReady) {
        return
      }
      if (auth.user === null && !getItem(authConfig.keyUserdata)) {
        if (router.asPath !== '/') {
          router.push({
            pathname: '/login',
            query: { returnUrl: router.asPath }
          }).catch((err) => {
            if (!err.cancelled) {
              throw err;
            }
          })
        } else {
          router.push('/login').catch((err) => {
            if (!err.cancelled) {
              throw err;
            }
          })
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route]
  )

  if (auth.loading || auth.user === null) {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard
