import { createContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/router'
import authConfig from 'src/configs/auth'
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType } from './types'
import { useApi } from 'src/@open-adm/hooks/use-api'

const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter();
  const { post } = useApi();

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
      const user = window.localStorage.getItem(authConfig.keyUserdata);
      if (storedToken && user) {
        setLoading(true)
        setUser(JSON.parse(user));
        setLoading(false);
      } else {
        localStorage.removeItem(authConfig.keyUserdata)
        localStorage.removeItem(authConfig.storageTokenKeyName)
        setLoading(false)
      }
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = async (params: LoginParams, errorCallback?: ErrCallbackType) => {

    try {
      const response: any = await post("login/funcionario", {
        email: params.email,
        senha: params.password
      })

      if (response?.token) {
        window
          .localStorage
          .setItem(authConfig.storageTokenKeyName, response.token)

        const returnUrl = router.query.returnUrl

        const user = { ...response.userData, role: 'admin' };
        setUser(user)

        window.localStorage.setItem(authConfig.keyUserdata, JSON.stringify(user))

        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        if (params.rememberMe) {
          window.localStorage.setItem(authConfig.lembreMe, 'true');
          window.localStorage.setItem(authConfig.lembreMeEmail, params.email);
        } else {
          window.localStorage.removeItem(authConfig.lembreMeEmail);
          window.localStorage.removeItem(authConfig.lembreMe);
        }

        router.replace(redirectURL as string)
      } else {
        if (errorCallback) errorCallback();
      }
    } catch (error: any) {
      if (errorCallback) errorCallback(error?.response?.data?.message);
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem(authConfig.keyUserdata)
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
