import { useNewApi } from "../hooks/use-new-api";
import { IEnderecoBase } from "../types/base";


export function useApiCep() {
    const api = useNewApi({
        method: "GET",
        url: "cep/consultar?cep=",
    });

    async function consultar(cep: string): Promise<IEnderecoBase | undefined> {
        return await api.fecth({
            urlParams: cep,
        });
    }

    return {
        consulta: {
            fetch: consultar,
            status: api.statusRequisicao,
        },
    };
}
