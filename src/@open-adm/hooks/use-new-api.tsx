import axios from "axios";
import authConfig from 'src/configs/auth';
import { useSnackbar } from "../components/snack";

const errorJson: any = {
    "APIERROR011": "E-mail ou senha inválidos!",
    "APIERROR014": "Não é possível atualizar um pedido com status entregue, caso necessário, exclua o pedido!",
    "APIERROR010": "Telefone inválido!",
    "APIERROR020": "Este e-mail já se encontra cadastrado!"
};

type TypeMethod = "GET" | "POST" | "PUT" | "DELETE";
interface propsUseApi {
    method: TypeMethod;
    url: string;
    notHandleError?: boolean;
    notAlert?: boolean;
    notLoading?: boolean;
}

interface propsFecth {
    body?: any;
    urlParams?: string;
    message?: string;
}

function getMessage(method: TypeMethod): string {
    switch (method) {
        case "DELETE": return "Registro excluido com sucesso!";
        case "PUT": return "Registro editado com sucesso!";
        default: return "Registro criado com sucesso!";
    }
}

export function useNewApi(props: propsUseApi) {
    const snack = useSnackbar();

    //const URL_API = 'https://api.open-adm.tech/api/v1/'
    //const URL_API = 'http://localhost:40332/api/v1/'
    const URL_API = 'http://localhost:40332/api/v1/'
    const jwt = localStorage.getItem(authConfig.storageTokenKeyName);

    const api = axios.create({
        baseURL: URL_API,
    });

    const headers = {
        Authorization: `Bearer ${jwt}`,
    };

    function handleError(error: any) {
        if (errorJson[error?.response?.data?.message]) {
            snack.show(errorJson[error?.response?.data?.message], "error");
            return;
        }

        if (error?.response?.data?.message) {
            snack.show(error?.response?.data?.message, "error");
            return;
        }

        if (error?.response?.data?.errors) {
            let message = "";
            Object.keys(error?.response?.data?.errors).map((key) => {
                message = `${message}\n${error?.response?.data?.errors[key]}`;
            });
            snack.show(message, "error");
            return;
        }

        snack.show("Ocorreu um erro interno, tente novamente mais tarde!", "error");
    }

    async function fecth<T = unknown>(
        propsFecth?: propsFecth
    ): Promise<T | undefined> {
        try {
            const response = await api.request({
                url: propsFecth?.urlParams
                    ? `${props.url}${propsFecth?.urlParams}`
                    : props.url,
                data: propsFecth?.body,
                method: props.method,
                headers,
            });
            const message = propsFecth?.message ?? getMessage(props.method);
            if (message && !props.notAlert) {
                snack.show(message, "success");
            }
            return response?.data;
        } catch (error: any) {
            if (!props.notHandleError) {
                handleError(error);
            }
            throw error;
        }
    }

    return {
        fecth,
    };
}
