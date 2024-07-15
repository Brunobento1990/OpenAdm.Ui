import { YupAdapter } from "src/@open-adm/adapters/yup-adapter";
import { IConfiguracaoDeFreteCreate } from "src/@open-adm/types/configuracao-de-frete";

export const initialValues: IConfiguracaoDeFreteCreate = {
    cepOrigem: "",
    alturaEmbalagem: "",
    larguraEmbalagem: "",
    comprimentoEmbalagem: ""
}

export const schema = new YupAdapter()
    .string("cepOrigem")
    .string("alturaEmbalagem")
    .string("larguraEmbalagem")
    .string("comprimentoEmbalagem")
    .build();