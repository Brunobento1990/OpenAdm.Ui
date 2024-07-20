import { useNewApi } from "src/@open-adm/hooks/use-new-api";
import { ICliente, IClienteCreate } from "src/@open-adm/types/cliente";

export function useApiCliente() {
    const apiCreate = useNewApi({
        method: 'POST',
        url: 'usuarios/create'
    });

    const apiGet = useNewApi({
        method: "GET",
        url: "usuarios/get-conta-adm?id=",
        notAlert: true,
    });

    async function create(body: IClienteCreate): Promise<ICliente | undefined> {
        return await apiCreate.fecth({
            body
        });
    }

    async function get(id: string): Promise<ICliente | undefined> {
        return await apiGet.fecth<ICliente>({
            urlParams: id
        })
    }

    return {
        create,
        get
    }
}