import axios from "axios";
import authConfig from 'src/configs/auth';
import { useSnackbar } from "../components/snack";
import { useNavigateApp } from "./use-navigate-app";
import { useAuth } from "src/hooks/useAuth";
import { useLocalStorage } from "src/hooks/useLocalStorage";
import { useEffect, useRef } from "react";

export type TypeMethod = "GET" | "POST" | "PUT" | "DELETE";
interface propsUseApi {
    method: TypeMethod;
    url: string;
    notHandleError?: boolean;
    notAlert?: boolean;
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
    const { navigate } = useNavigateApp();
    const { logout } = useAuth();
    const { getItem } = useLocalStorage();
    const abortControllerRef = useRef<any>(null);

    const URL_API = process.env.NEXT_PUBLIC_URL_API;

    const api = axios.create({
        baseURL: URL_API,
    });

    function handleError(error: any) {
        if (error?.response?.status === 401) {
            snack.show(error?.response?.data?.mensagem, "error");
            logout();
            navigate('/login');
            return;
        }

        if (error?.response?.data?.mensagem) {
            snack.show(error?.response?.data?.mensagem, "error");
            return;
        }

        snack.show("Ocorreu um erro interno, tente novamente mais tarde!", "error");
    }

    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    async function fecth<T = unknown>(
        propsFecth?: propsFecth
    ): Promise<T | undefined> {
        try {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            abortControllerRef.current = new AbortController();
            const { signal } = abortControllerRef.current;
            const jwt = getItem<string>(authConfig.storageTokenKeyName);
            const headers = {
                Authorization: `Bearer ${jwt}`,
            };
            const response = await api.request({
                url: propsFecth?.urlParams
                    ? `${props.url}${propsFecth?.urlParams}`
                    : props.url,
                data: propsFecth?.body,
                method: props.method,
                headers,
                signal,
            });
            const message = propsFecth?.message ?? getMessage(props.method);
            if (message && !props.notAlert) {
                snack.show(message, "success");
            }
            return response?.data;
        } catch (error: any) {
            if (error?.code === 'ERR_CANCELED') {
                return undefined;
            }
            if (!props.notHandleError) {
                handleError(error);
            }
            return undefined;
        }
    }

    return {
        fecth,
    };
}
