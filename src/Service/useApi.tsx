import axios from 'axios';
import { useLoader } from '../Components/Loading';
import { useModal } from '../Components/Modals';

function getSocket() {
  const baseUrl = "https://localhost:7082/api/"
  //const baseUrl = "https://api-server.shop/api/"
  const localAuth = localStorage.getItem('token');
  const auth = localAuth ? localAuth : '';

  return axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${auth}`,
    }
  })
}

export function useApi() {

  const Loader = useLoader();
  const Modal = useModal();

  async function post(url: string, payload: any, message?: string) {

    try {

      Loader.show();
      const api = getSocket();
      const response = await api.post(url, payload);
      if (url === "Login") {
        console.log(response.data)
        localStorage.setItem("token", response.data.token)
        window.location.href = "/home"
      } else {
        Modal.show(message);
      }
      return response.data;
    } catch (error: any) {
      if (error.response) {
        Modal.show(error.response.data)
      } else {
        Modal.show("Ocorreu um erro interno, tente novamente mais tarde.")
        localStorage.removeItem("token")
        window.location.href = "/"
      }
    } finally {
      Loader.hide();
    }
  }

  return {
    post
  }

}
