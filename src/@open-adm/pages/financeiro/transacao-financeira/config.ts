import { YupAdapter } from "src/@open-adm/adapters/yup-adapter";
import { convertDateForJson } from "src/@open-adm/utils/convert-date";
const dataAtual = new Date();
const dataInicial = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1);
const dataFinal = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1, dataAtual.getDate());

export const schema = new YupAdapter().string('dataInicial').string('dataFinal').build();

export const initialValues = {
    dataInicial: convertDateForJson(dataInicial.toLocaleDateString()),
    dataFinal: convertDateForJson(dataFinal.toLocaleDateString()),
}