import axios from 'axios'
import { useRouter } from 'next/router';
import authConfig from 'src/configs/auth'
import { useSnackbar } from '../components/snack';
import { useLoader } from '../components/loader';
const errorJson: any = {
  "APIERROR011": "E-mail ou senha inválidos!",
  "APIERROR014": "Não é possível atualizar um pedido com status entregue, caso necessário, exclua o pedido!",
  "APIERROR010": "Telefone inválido!",
  "APIERROR020": "Este e-mail já se encontra cadastrado!"
};

interface IOptions {
  loading?: boolean
}

const URL_API = 'https://api.open-adm.tech/api/v1/'
//const URL_API = 'http://localhost:40332/api/v1/'

export function useApi() {

  const router = useRouter();
  const snack = useSnackbar();
  const loader = useLoader();

  function handleError(error?: any) {
    console.log('error : ', error)
    if (!error) {
      snack.show();
      return;
    }

    if (error?.response?.status === 401 || !error?.response) {
      window.localStorage.removeItem(authConfig.storageTokenKeyName);
      window.localStorage.removeItem(authConfig.keyUserdata);
      snack.show("É necessário efetuar o login novamente!")
      router.replace('/login')
      return;
    }

    if (error?.response?.data?.errors) {
      let messages = '';
      Object.keys(error?.response?.data?.errors).map(key => {
        if (Array.isArray(error?.response?.data?.errors[key])) {
          messages += error?.response?.data?.errors[key].join("\n")
        } else {
          messages += error?.response?.data?.errors[key]
        }
      })

      snack.show(messages);
      return;
    }


    if (errorJson[error?.response?.data?.message]) {
      snack.show(errorJson[error?.response?.data?.message]);
    } else {
      if (error?.response?.data?.message)
        snack.show(error?.response?.data?.message);
      else
        snack.show();
    }

  }

  async function get<T>(url: string, options?: IOptions): Promise<T | undefined> {
    try {

      if (!options) {
        loader.show();
      } else {
        if (options.loading) {
          loader.show();
        }
      }

      const api = axios.create({
        baseURL: URL_API,
        headers: {
          Authorization: `Bearer ${localStorage.getItem(authConfig.storageTokenKeyName)}`,
          "Content-Type": 'application/json'
        }
      })

      return (await api.get(url)).data as T
    } catch (error: any) {
      handleError(error)
    } finally {
      loader.hide();
    }
  }

  async function getCnpj(cnpj?: string) {
    if (!cnpj || cnpj?.length < 14)
      return;

    loader.show();

    try {
      const api = axios.create({
        baseURL: 'https://api-publica.speedio.com.br',
        headers: {
          "Content-Type": 'application/json'
        }
      })

      return (await api.get(`/buscarcnpj?cnpj=${cnpj}`)).data
    } catch (error) {
      snack.show('Ocorreu um erro ao consultar o CNPJ!');
    } finally {
      loader.hide();
    }
  }

  async function post<T>(url: string, body: T): Promise<T | undefined> {
    try {
      loader.show();
      const api = axios.create({
        baseURL: URL_API,
        headers: {
          Authorization: `Bearer ${localStorage.getItem(authConfig.storageTokenKeyName)}`,
          "Content-Type": 'application/json'
        }
      })
      console.log(URL_API)
      return (await api.post(url, body)).data as T
    } catch (error: any) {
      handleError(error)
    } finally {
      loader.hide();
    }
  }

  async function put<T>(url: string, body: T): Promise<T | undefined> {
    try {
      loader.show();
      const api = axios.create({
        baseURL: URL_API,
        headers: {
          Authorization: `Bearer ${localStorage.getItem(authConfig.storageTokenKeyName)}`,
          "Content-Type": 'application/json'
        }
      })

      return (await api.put(url, body)).data as T
    } catch (error: any) {
      handleError(error)
    } finally {
      loader.hide();
    }
  }
  async function deleteApi<T>(url: string): Promise<T | undefined> {
    try {
      loader.show();
      const api = axios.create({
        baseURL: URL_API,
        headers: {
          Authorization: `Bearer ${localStorage.getItem(authConfig.storageTokenKeyName)}`,
          "Content-Type": 'application/json'
        }
      })

      return (await api.delete(url)).data as T
    } catch (error: any) {
      handleError(error)
    } finally {
      loader.hide();
    }
  }

  return {
    get,
    post,
    put,
    deleteApi,
    getCnpj
  }
}