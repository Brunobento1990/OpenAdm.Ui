import { useFormikAdapter } from "src/@open-adm/adapters/formik-adapter";
import { Form } from "src/@open-adm/components/form";
import { IExtratoTrasacao, ITransacaoFinanceira } from "src/@open-adm/types/transacao-financeira";
import { initialValues, schema } from "./config";
import { FormRow } from "src/@open-adm/components/form/row";
import { FormItemRow } from "src/@open-adm/components/form/item-row";
import { InputDate } from "src/@open-adm/components/input/input-date";
import { convertDateForJson, formatDateComHoras } from "src/@open-adm/utils/convert-date";
import { useApiTransacao } from "src/@open-adm/api/use-api-transacao";
import { useState } from "react";
import { TablePaginacao } from "src/@open-adm/components/table-paginacao/table";
import { formatMoney } from "src/@open-adm/utils/format-money";
import { BoxApp } from "src/@open-adm/components/box";
import { DropDownMultiple } from "src/@open-adm/components/drop-down-scroll/dorp-down-multiple";
import { DropDownScroll } from "src/@open-adm/components/drop-down-scroll";

export function Extrato() {
    const [loading, setLoading] = useState(false)
    const [transacoes, setTransacoes] = useState<ITransacaoFinanceira[]>([])
    const { extratoPeriodo } = useApiTransacao()
    const form = useFormikAdapter<IExtratoTrasacao>({
        onSubmit: submit,
        initialValues: initialValues,
        validationSchema: schema
    })

    async function submit() {
        setLoading(true)
        const response = await extratoPeriodo(form.values)
        if (response) {
            setTransacoes(response)
        }
        setLoading(false)
    }

    console.log('values', form.values)

    return (
        <Form
            loading={loading}
            submit={form.onSubmit}
            action=""
            title="Extrato por período"
            titleButton="Carregar"
        >
            <FormRow spacing={3}>
                <FormItemRow sm={3} xs={12}>
                    <InputDate
                        required
                        fullWidth
                        id="dataInicial"
                        label="Data inicial"
                        name="dataInicial"
                        value={form.values.dataInicial}
                        onChange={form.onChange}
                        onBlur={form.onBlur}
                        error={form.error('dataInicial')}
                        helperText={form.helperText('dataInicial')}
                    />
                </FormItemRow>
                <FormItemRow sm={3} xs={12}>
                    <InputDate
                        fullWidth
                        required
                        id="dataFinal"
                        label="Data final"
                        name="dataFinal"
                        value={form.values.dataFinal}
                        onChange={form.onChange}
                        onBlur={form.onBlur}
                        error={form.error('dataFinal')}
                        helperText={form.helperText('dataFinal')}
                    />
                </FormItemRow>
                {/* <FormItemRow>
                    <DropDownScroll
                        id="pedidoId"
                        label="Pedido"
                        onChange={form.onChange}
                        url="pedidos/paginacao"
                        retornarObjetoCompleto
                        keyLabel={"numero"}
                    />
                </FormItemRow> */}
            </FormRow>
            <BoxApp marginTop="1rem" height="calc(100vh - 400px)" overflowy="auto">
                <TablePaginacao
                    maxHeigth={"calc(100vh - 400px)"}
                    stickyHeader
                    minWidth={2000}
                    columns={[
                        {
                            width: 100,
                            field: 'usuario',
                            headerName: 'Cliente',
                            renderCell: (row: ITransacaoFinanceira) => row.parcela?.fatura?.usuario?.nome ?? ''
                        },
                        {
                            width: 100,
                            field: 'data',
                            headerName: 'Data do pagamento',
                            renderCell: (row: ITransacaoFinanceira) => formatDateComHoras(row.dataDePagamento) ?? ''
                        },
                        {
                            width: 100,
                            field: 'valor',
                            headerName: 'Valor',
                            renderCell: (row: ITransacaoFinanceira) => formatMoney(row.valor) ?? ''
                        },
                        {
                            width: 150,
                            field: 'valorParcela',
                            headerName: 'Valor parcela',
                            renderCell: (row: ITransacaoFinanceira) => formatMoney(row.parcela?.valor) ?? ''
                        },
                        {
                            width: 100,
                            field: 'valorAReceber',
                            headerName: 'Valor recebr/pagar',
                            renderCell: (row: ITransacaoFinanceira) => formatMoney(row.parcela?.valorAPagarAReceber) ?? ''
                        },
                        {
                            width: 100,
                            field: 'desconto',
                            headerName: 'Desconto da parcela',
                            renderCell: (row: ITransacaoFinanceira) => formatMoney(row.parcela?.desconto) ?? ''
                        },
                        {
                            width: 50,
                            field: 'tipo',
                            headerName: 'Tipo',
                            renderCell: (row: ITransacaoFinanceira) => row.tipoTransacaoFinanceira === 0 ? 'Entrada' : 'Saída'
                        },
                        {
                            width: 100,
                            field: 'pedido',
                            headerName: 'Pedido',
                            renderCell: (row: ITransacaoFinanceira) => row.parcela?.fatura?.pedido?.numero ? `#${row.parcela?.fatura?.pedido?.numero}` : ''
                        },
                    ]}
                    rows={transacoes}
                />
            </BoxApp>
        </Form>
    )
}