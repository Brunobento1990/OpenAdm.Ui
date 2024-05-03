import { useNewApi } from "src/@open-adm/hooks/use-new-api";
import { IConfiguracaoPagamentoMercadoPago } from "src/@open-adm/types/configuracao-papagamento-mercado-pago";

export function apiMercadoPago() {

    const created = useNewApi({
        method: "POST",
        url: "pagamento/configuracao-pagamento-mercado-pago/create-or-update",
    })

    const get = useNewApi({
        method: "GET",
        url: "pagamento/configuracao-pagamento-mercado-pago/get",
        notAlert: true,
    })

    async function cretarOrUpdate(config: Partial<IConfiguracaoPagamentoMercadoPago>)
        : Promise<IConfiguracaoPagamentoMercadoPago | undefined> {
        return created.fecth<IConfiguracaoPagamentoMercadoPago>({
            body: config
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