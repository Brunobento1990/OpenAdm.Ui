import { useNewApi } from "src/@open-adm/hooks/use-new-api";
import { IConfiguracaoDeFrete, IConfiguracaoDeFreteCreate } from "src/@open-adm/types/configuracao-de-frete";

export function useApiConfiguracaoDeFrete() {
    const apiCreate = useNewApi({
        method: 'POST',
        url: 'configuracao-de-frete'
    });

    const apiGet = useNewApi({
        method: 'GET',
        url: 'configuracao-de-frete',
        notAlert: true,
        notLoading: true
    });

    async function create(body: IConfiguracaoDeFreteCreate): Promise<IConfiguracaoDeFrete | undefined> {
        return await apiCreate.fecth<IConfiguracaoDeFrete>({
            body
        });
    }

    async function get(): Promise<IConfiguracaoDeFrete | undefined> {
        return await apiGet.fecth<IConfiguracaoDeFrete>();
    }

    return {
        create,
        get
    }
}