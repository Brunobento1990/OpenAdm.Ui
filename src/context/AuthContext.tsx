import { createContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/router'
import authConfig from 'src/configs/auth'
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType } from './types'
import { useNewApi } from 'src/@open-adm/hooks/use-new-api'
import { useLocalStorage } from 'src/hooks/useLocalStorage'

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
  const { setItem, remove, getItem } = useLocalStorage();
  // ** Hooks
  const router = useRouter();
  const { fecth } = useNewApi({
    method: 'POST',
    url: 'login/funcionario',
    notAlert: true
  });

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = getItem<string>(authConfig.storageTokenKeyName)!
      const user = getItem<string>(authConfig.keyUserdata);
      if (storedToken && user) {
        setLoading(true)
        console.log('user: ', user)
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
      const response: any = await fecth({
        body: {
          email: params.email,
          senha: params.password
        },
      })

      if (response?.token) {
        setItem(authConfig.storageTokenKeyName, response.token)
        const returnUrl = router.query.returnUrl;
        const user = { ...response.userData, role: 'admin' };
        setUser(user)
        console.log('response: ', response)
        setItem(authConfig.keyUserdata, user, true);
        setItem(authConfig.xApy, response.xApi)

        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        if (params.rememberMe) {
          setItem(authConfig.lembreMe, 'true');
          setItem(authConfig.lembreMeEmail, params.email);
        } else {
          remove(authConfig.lembreMeEmail);
          remove(authConfig.lembreMe);
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
    remove(authConfig.keyUserdata)
    remove(authConfig.storageTokenKeyName)
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
