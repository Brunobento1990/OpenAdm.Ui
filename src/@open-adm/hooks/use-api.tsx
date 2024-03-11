import axios from 'axios'
import { useRouter } from 'next/router';
import authConfig from 'src/configs/auth'
import { useSnackbar } from '../components/snack';
import * as Error from '../Error/ErrorApi.json'
import { useLoader } from '../components/loader';
const errorJson = Error as any;

const URL_API = '	https://api.open-adm.tech/api/v1/'

export function useApi<T = unknown>() {

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

  async function get(url: string): Promise<T | undefined> {
    try {
      loader.show();
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

  async function post(url: string, body: T): Promise<T | undefined> {
    try {

      loader.show();
      const api = axios.create({
        baseURL: URL_API,
        headers: {
          Authorization: `Bearer ${localStorage.getItem(authConfig.storageTokenKeyName)}`,
          "Content-Type": 'application/json'
        }
      })

      return (await api.post(url, body)).data as T
    } catch (error: any) {
      handleError(error)
    } finally {
      loader.hide();
    }
  }

  async function put(url: string, body: T): Promise<T | undefined> {
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
  async function deleteApi(url: string): Promise<T | undefined> {
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
    deleteApi
  }
}