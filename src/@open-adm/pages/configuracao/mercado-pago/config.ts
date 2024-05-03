import { YupAdapter } from "src/@open-adm/adapters/yup-adapter";
import { IConfiguracaoPagamentoMercadoPago } from "src/@open-adm/types/configuracao-papagamento-mercado-pago";

export const initialValues: Partial<IConfiguracaoPagamentoMercadoPago> = {
    publicKey: "",
    accessToken: ""
}

export const schema = new YupAdapter()
    .string("publicKey")
    .string("accessToken")
    .build();