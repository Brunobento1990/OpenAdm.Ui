import { useEffect, useState } from "react";
import { useFormikAdapter } from "src/@open-adm/adapters/formik-adapter";
import { useApiParcela } from "src/@open-adm/api/use-api-parcela";
import { BoxApp } from "src/@open-adm/components/box";
import { StatusApp } from "src/@open-adm/components/chip";
import { DropDown } from "src/@open-adm/components/drop-down";
import { Form } from "src/@open-adm/components/form";
import { FormItemRow } from "src/@open-adm/components/form/item-row";
import { FormRow } from "src/@open-adm/components/form/row";
import { InputCustom, MaskType } from "src/@open-adm/components/input";
import { TextApp } from "src/@open-adm/components/text";
import { useNavigateApp } from "src/@open-adm/hooks/use-navigate-app"
import { StatusObj } from "src/@open-adm/pages/pedidos/config";
import { meiosDePagamentos } from "src/@open-adm/types/contas-a-receber";
import { IParcela } from "src/@open-adm/types/fatura";
import { formatDate } from "src/@open-adm/utils/convert-date";
import { cleanFormatMoney, formatMoney } from "src/@open-adm/utils/format-money";

export const statusFatura: StatusObj = {
    0: { title: 'Aberta', color: 'warning' },
    1: { title: 'Paga parcialmente', color: 'info' },
    2: { title: 'Paga', color: 'success' }
}

export function BaixarParcela() {
    const { obterParcela, pagarParcela } = useApiParcela();
    const { id, navigate } = useNavigateApp();
    const form = useFormikAdapter<IParcela>({
        onSubmit: pagar,
    })
    const [dataDePagamento, setDataDePagemento] = useState('')
    const [loading, setLoading] = useState(true)

    async function init() {
        const response = await obterParcela(id ?? '');
        if (response) {
            form.setValue(response)
        }
        setLoading(false)
    }

    async function pagar() {
        setLoading(true)
        const response = await pagarParcela({
            id: form.values.id,
            valor: cleanFormatMoney(form.values.valor) ?? 0,
            dataDePagamento,
            desconto: cleanFormatMoney(form.values.desconto),
            meioDePagamento: form.values.meioDePagamento,
            observacao: form.values.observacao
        })

        if (response) {
            navigate(urlVoltar)
            return;
        }

        setLoading(false)
    }

    const status = statusFatura[form.values.status ?? 0]
    const urlVoltar = form.values.fatura?.tipo === 0 ? '/financeiro/contas-a-pagar' : '/financeiro/contas-a-receber'

    useEffect(() => {
        init()
    }, [])

    return <Form
        action=""
        title="Baixar parcela"
        carregandoDados={loading}
        submit={form.onSubmit}
        urlVoltar={urlVoltar}
    >
        <BoxApp display="flex" flexDirection="column" gap=".5rem">
            <TextApp texto={`Fatura: #${form.values.fatura?.numero ?? ''}`} />
            <TextApp texto={`Cliente: ${form.values.fatura?.usuario?.nome ?? ''}`} />
            {form.values.fatura?.pedido &&
                <TextApp texto={`Pedido: #${form.values.fatura.pedido.numero ?? ''}`} />
            }
            <TextApp texto={`Vencimento: ${formatDate(form.values.dataDeVencimento)}`} />
            <TextApp texto={`Parcela: ${form.values.numeroDaParcela}`} />
            <StatusApp width="100px" cor={status.color} titulo={status.title} />
            <TextApp texto={`Valor pago/Recebido: ${formatMoney(form.values.valorPagoRecebido)}`} />
            <TextApp texto={`Valor a pagar/a receber: ${formatMoney(form.values.valorAPagarAReceber)}`} />
        </BoxApp>
        <FormRow spacing={3}>
            <FormItemRow sm={6} xs={12}>
                <InputCustom
                    fullWidth
                    id="valor"
                    label="Valor"
                    name="valor"
                    value={form.values.valor}
                    mask={MaskType.MONEY}
                    onChange={form.onChange}
                    onBlur={form.onBlur}
                    required
                />
            </FormItemRow>
            <FormItemRow sm={6} xs={12}>
                <InputCustom
                    fullWidth
                    id="desconto"
                    label="Desconto"
                    name="desconto"
                    value={form.values.desconto}
                    mask={MaskType.MONEY}
                    onChange={form.onChange}
                    onBlur={form.onBlur}
                />
            </FormItemRow>
            <FormItemRow sm={6} xs={12}>
                <DropDown
                    id="meioDePagamento"
                    keyLabel="descricao"
                    label="Meio de pagamento"
                    values={meiosDePagamentos}
                    key={"meioDePagamento"}
                    value={meiosDePagamentos.find((x) => x.id === form.values.meioDePagamento)}
                    onChange={form.onChange}
                    onBlur={form.onBlur}
                />
            </FormItemRow>
            <FormItemRow sm={6} xs={12}>
                <InputCustom
                    fullWidth
                    id="dataDePagamento"
                    label="Data de pagamento"
                    name="dataDePagamento"
                    value={dataDePagamento}
                    type="date"
                    onChange={(_, value) => setDataDePagemento(value)}
                />
            </FormItemRow>
        </FormRow>
        <FormRow spacing={3}>
            <FormItemRow sm={12} xs={12}>
                <InputCustom
                    fullWidth
                    id="observacao"
                    label="observacao"
                    name="observacao"
                    value={form.values.observacao}
                    maxLength={500}
                    onChange={form.onChange}
                    onBlur={form.onBlur}
                />
            </FormItemRow>
        </FormRow>
    </Form>
}