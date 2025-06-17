import { useNewApi } from "src/@open-adm/hooks/use-new-api";
import { IConfiguracaoPagamentoMercadoPago } from "src/@open-adm/types/configuracao-papagamento-mercado-pago";

export function apiMercadoPago() {

    const created = useNewApi({
        method: "POST",
        url: "configuracao-de-pagamento/create-or-update",
    })

    const get = useNewApi({
        method: "GET",
        url: "configuracao-de-pagamento/get",
        naoRenderizarResposta: true,
    })

    async function cretarOrUpdate(config: Partial<IConfiguracaoPagamentoMercadoPago>)
        : Promise<IConfiguracaoPagamentoMercadoPago | undefined> {
        return created.fecth<IConfiguracaoPagamentoMercadoPago>({
            body: config,
            message: 'Registro editado com sucesso!'
        });
    }

    async function getConfig(): Promise<IConfiguracaoPagamentoMercadoPago | undefined> {
        return await get.fecth<IConfiguracaoPagamentoMercadoPago>();
    }

    return {
        cretarOrUpdate,
        getConfig
    }
}