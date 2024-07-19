import { useNewApi } from "src/@open-adm/hooks/use-new-api";
import { ICliente, IClienteCreate } from "src/@open-adm/types/cliente";

export function useApiCliente() {
    const apiCreate = useNewApi({
        method: 'POST',
        url: 'usuarios/create'
    });

    async function create(body: IClienteCreate): Promise<ICliente | undefined> {
        return await apiCreate.fecth({
            body
        });
    }

    return {
        create
    }
}