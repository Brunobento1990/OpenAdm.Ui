import { useFormikAdapter } from "src/@open-adm/adapters/formik-adapter";
import { IForm } from "src/@open-adm/types/form";
import { useContasAReceber } from "./use-api-contas-a-receber";
import { IFaturaContasAReceber, meiosDePagamentos, statusFaturaAReceber } from "src/@open-adm/types/contas-a-receber";
import { useNavigateApp } from "src/@open-adm/hooks/use-navigate-app";
import { useEffect, useState } from "react";
import { Form } from "src/@open-adm/components/form";
import { BoxApp } from "src/@open-adm/components/box";
import { TextApp } from "src/@open-adm/components/text";
import { formatDate } from "src/@open-adm/utils/convert-date";
import { FormRow } from "src/@open-adm/components/form/row";
import { FormItemRow } from "src/@open-adm/components/form/item-row";
import { InputCustom, MaskType } from "src/@open-adm/components/input";
import { InputDate } from "src/@open-adm/components/input/input-date";
import { DropDown } from "src/@open-adm/components/drop-down";
import { clearMaskCnpj, clearMaskMoney } from "src/@open-adm/utils/mask";

export function FaturaContasAReceberForm(props: IForm) {
    const readonly = props.action === 'view';
    const urlVoltar = "/financeiro/contas-a-receber";
    const [loading, setLoading] = useState(false);
    const { id, navigate } = useNavigateApp();
    const { get, edit } = useContasAReceber();
    const form = useFormikAdapter<IFaturaContasAReceber>({
        onSubmit: submit,
        initialValues: {}
    })

    async function submit() {
        if (props.action === 'update') {
            setLoading(true);
            const response = await edit({
                ...form.values,
                valor: clearMaskMoney(form.values.valor),
                desconto: clearMaskMoney(form.values.desconto)
            })
            setLoading(false);
            if (response) {
                navigate(urlVoltar)
            }
        }
    }

    async function init() {
        const response = await get(id ?? '');
        if (response) {
            form.setValue(response)
        }
    }

    useEffect(() => {
        init();
    }, [])

    return (
        <Form submit={form.onSubmit} loading={loading} urlVoltar={urlVoltar} title={`Fatura: #${form.values.numero}`} action={props.action}>
            <BoxApp>
                <TextApp texto={`N° da fatura: #${form.values.numeroDaFatura}`} />
                <TextApp texto={`Data de cadastro: ${formatDate(form.values.dataDeCriacao)}`} />
                <TextApp texto={`Vencida: ${form.values.vencida ? 'Sim' : 'Não'}`} />
                {form.values.dataDePagamento &&
                    <TextApp texto={`Data de pagamento: ${formatDate(form.values.dataDePagamento)}`} />
                }
            </BoxApp>
            <FormRow spacing={3}>
                <FormItemRow xs={12} sm={4}>
                    <DropDown
                        id="status"
                        keyLabel="descricao"
                        label="Status"
                        values={statusFaturaAReceber}
                        key={"id"}
                        value={statusFaturaAReceber.find((x) => x.id === form.values.status)}
                        onChange={form.onChange}
                        readonly={readonly}
                    />
                </FormItemRow>
            </FormRow>
            <FormRow spacing={3}>
                <FormItemRow>
                    <InputCustom
                        label={"Valor"}
                        name={"valor"}
                        id={"valor"}
                        value={form.values.valor}
                        onChange={form.onChange}
                        fullWidth
                        mask={MaskType.MONEY}
                        readonly={readonly}
                    />
                </FormItemRow>
                <FormItemRow>
                    <InputCustom
                        label={"Desconto"}
                        name={"desconto"}
                        id={"desconto"}
                        value={form.values.desconto}
                        onChange={form.onChange}
                        fullWidth
                        mask={MaskType.MONEY}
                        readonly={readonly}
                    />
                </FormItemRow>
                <FormItemRow>
                    <InputDate
                        label={"Vencimento"}
                        name={"dataDeVencimento"}
                        id={"dataDeVencimento"}
                        value={form.values.dataDeVencimento}
                        onChange={form.onChange}
                        fullWidth
                        readonly={readonly}
                    />
                </FormItemRow>
            </FormRow>
            <FormRow spacing={3}>
                <FormItemRow>
                    <InputDate
                        label={"Data de pagamento"}
                        name={"dataDePagamento"}
                        id={"dataDePagamento"}
                        value={form.values.dataDePagamento}
                        onChange={form.onChange}
                        fullWidth
                        readonly={readonly}
                    />
                </FormItemRow>
                <FormItemRow xs={12} sm={4}>
                    <DropDown
                        id="meioDePagamento"
                        keyLabel="descricao"
                        label="Meio de pagamento"
                        values={meiosDePagamentos}
                        key={"id"}
                        value={meiosDePagamentos.find((x) => x.id === form.values.meioDePagamento)}
                        onChange={form.onChange}
                        readonly={readonly}
                    />
                </FormItemRow>
                <FormItemRow>
                    <InputCustom
                        label={"Observação"}
                        name={"observacao"}
                        id={"observacao"}
                        value={form.values.observacao}
                        onChange={form.onChange}
                        fullWidth
                        maxLength={255}
                        readonly={readonly}
                    />
                </FormItemRow>
            </FormRow>
        </Form>
    )
}