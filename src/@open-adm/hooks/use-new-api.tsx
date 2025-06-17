import axios, { GenericAbortSignal } from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useSnackbar } from "../components/snack";
import authConfig from 'src/configs/auth';
import { useLocalStorage } from "src/hooks/useLocalStorage";
import { useAuth } from "src/hooks/useAuth";

export type TypeMethod = "GET" | "POST" | "PUT" | "DELETE";
export type StatusRequisicao = "loading" | "erro" | "sucesso";

interface propsUseApi {
    method: TypeMethod;
    url: string;
    naoRenderizarErro?: boolean;
    naoRenderizarResposta?: boolean;
    header?: any;
    statusInicial?: StatusRequisicao;
}

interface propsFecth {
    body?: any;
    urlParams?: string;
    message?: string;
    signal?: GenericAbortSignal;
    desativarSignal?: boolean;
}

const URL_API = process.env.NEXT_PUBLIC_URL_API;

function getMessage(method: TypeMethod): string {
    switch (method) {
        case "DELETE":
            return "Registro excluido com sucesso!";
        case "PUT":
            return "Registro editado com sucesso!";
        default:
            return "Registro criado com sucesso!";
    }
}

export function useNewApi(props: propsUseApi) {
    const [error, setError] = useState<any>();
    const [statusRequisicao, setStatusRequisicao] = useState<
        StatusRequisicao | undefined
    >(props.statusInicial);
    const snack = useSnackbar();
    const abortControllerRef = useRef<any>(null);
    const { logout } = useAuth();
    const { getItem, setItem } = useLocalStorage();

    const api = axios.create({
        baseURL: URL_API,
    });

    useEffect(() => {
        return () => {
            setStatusRequisicao(undefined);
            setError(undefined);
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    function erro(error: any) {
        if (error?.code === "ERR_NETWORK") {
            snack.show(
                `Erro de conexão com nossos servidores, tente novamente, ou entre em contato com o suporte.`,
                "error"
            );
            return;
        }
        const erro = error?.response?.data?.mensagem;
        if (error?.response?.status === 401) {
            snack.show(`${erro ?? "Sessão expirada!"}`, "error");
            logout();
            return;
        }

        if (erro) {
            snack.show(erro, "error");
            return;
        }

        snack.show("Ocorreu um erro interno, tente novamente mais tarde!", "error");
    }

    async function action<T = unknown>(
        propsFecth?: propsFecth
    ): Promise<T | undefined> {
        try {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            if (!statusRequisicao || statusRequisicao !== "loading") {
                setStatusRequisicao("loading");
            }
            abortControllerRef.current = new AbortController();
            const { signal } = abortControllerRef.current;
            const jwt = getItem<string>(authConfig.storageTokenKeyName);
            const headers = {
                Authorization: `Bearer ${jwt ?? ""}`,
                ...(props.header ?? {}),
            };
            const response = await api.request({
                url: propsFecth?.urlParams
                    ? `${props.url}${propsFecth?.urlParams}`
                    : props.url,
                data: propsFecth?.body,
                method: props.method,
                headers,
                signal: !propsFecth?.desativarSignal ? signal : undefined,
            });
            const message = propsFecth?.message ?? getMessage(props.method);
            if (message && !props.naoRenderizarResposta && props.method !== "GET") {
                snack.show(message, "success");
            }
            const responseHeader = response.headers as any;
            // if (responseHeader["novotoken"]) {
            //     setItem(keysLocalStorage.jwt, responseHeader["novotoken"]?.toString());
            // }
            setStatusRequisicao("sucesso");
            return response?.data as T;
        } catch (err: any) {
            setStatusRequisicao("erro");
            if (err?.code === "ERR_CANCELED") {
                return undefined;
            }
            if (!props.naoRenderizarErro) {
                erro(err);
            }
            setError(err);
            return undefined;
        }
    }

    return {
        fecth: action,
        statusRequisicao,
        error,
    };
}
