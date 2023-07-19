import axios from 'axios';
import { useLoader } from '../Components/Loading';
import { useModal } from '../Components/Modals';
import { useNavigate } from 'react-router-dom';
import { useContextApp } from '../hooks/use-context-app';

function getSocket() {
  //const baseUrl = "https://localhost:7082/api/"
  const baseUrl = "https://api-server.shop/api/"
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
  const useContext = useContextApp();
  //const navigate = useNavigate();

  async function getUsuario(){
    try {

      Loader.show();
      const api = getSocket();
      const response = await api.get("retorna-usuario");

      return response.data;
    } catch (error: any) {
      if (error.response) {
        Modal.show(error.response.data)
      } else {
        Modal.show("Ocorreu um erro interno, tente novamente mais tarde.")
      }
    } finally {
      Loader.hide();
    }
  }

  async function getEmpresa(){
    try {

      Loader.show();
      const api = getSocket();
      const response = await api.get("retorna-empresa");

      return response.data;
    } catch (error: any) {
      if (error.response) {
        Modal.show(error.response.data)
      } else {
        Modal.show("Ocorreu um erro interno, tente novamente mais tarde.")
      }
    } finally {
      Loader.hide();
    }
  }

  async function post(url: string, payload: any, message?: string) {

    try {

      Loader.show();
      const api = getSocket();
      const response = await api.post(url, payload);
      if (url === "login") {
        useContext.setContextApp(response.data)
        //navigate("/home")
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
        useContext.clearContextApp();
        //navigate("/")
        window.location.href = "/"
      }
    } finally {
      Loader.hide();
    }
  }

  return {
    post,
    getEmpresa,
    getUsuario
  }

}
