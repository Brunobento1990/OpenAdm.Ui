import { useNewApi } from "../hooks/use-new-api";
import { IConsultaCnpj } from "../types/consulta-cnpj";

export function useApiCnpj() {
    const apiConsulta = useNewApi({
        method: 'GET',
        url: 'cnpj/consulta'
    })

    async function consultar(cnpj: string): Promise<IConsultaCnpj | undefined> {
        return await apiConsulta.fecth({ urlParams: `?cnpj=${cnpj}` })
    }

    return {
        consultar: {
            fetch: consultar,
            status: apiConsulta.statusRequisicao
        }
    }
}