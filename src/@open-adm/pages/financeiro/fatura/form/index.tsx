import { Typography } from "@mui/material";
import { useState } from "react";
import { useFormikAdapter } from "src/@open-adm/adapters/formik-adapter";
import { YupAdapter } from "src/@open-adm/adapters/yup-adapter";
import { BoxApp } from "src/@open-adm/components/box";
import { DividerApp } from "src/@open-adm/components/divider";
import { DropDown } from "src/@open-adm/components/drop-down";
import { DropDownScroll } from "src/@open-adm/components/drop-down-scroll";
import { Form } from "src/@open-adm/components/form";
import { GridApp, GridItemApp } from "src/@open-adm/components/grid";
import { InputCustom, MaskType } from "src/@open-adm/components/input";
import { useNavigateApp } from "src/@open-adm/hooks/use-navigate-app";
import { useNewApi } from "src/@open-adm/hooks/use-new-api";
import { meiosDePagamentos } from "src/@open-adm/types/contas-a-receber";
import { IFaturaCriar } from "src/@open-adm/types/fatura";
import { cleanFormatMoney } from "src/@open-adm/utils/format-money";
import { geradorParcelas } from "src/@open-adm/utils/gerador-parcelas";

interface propsCreateFatura {
    tipo: 0 | 1,
    urlVoltar: string;
}

export function CreateFatura(props: propsCreateFatura) {
    const titulo = props.tipo === 0 ? 'Contas a pagar' : 'Contas a receber'
    const { navigate } = useNavigateApp();
    const [loading, setLoading] = useState(false)
    const form = useFormikAdapter<IFaturaCriar>({
        onSubmit: submit,
        initialValues: {},
        validationSchema: new YupAdapter().string('usuarioId').build()
    })
    const api = useNewApi({
        method: 'POST',
        url: 'fatura/criar'
    })

    function gerarParcelas() {
        const newParcelas = geradorParcelas({
            quantidadeDeParcelas: form.values.quantidadeDeParcelas,
            valor: form.values.total
        })
        if (newParcelas) {
            form.setValue({
                parcelas: newParcelas
            })
        }
    }

    function editParcela(index: number, key: string, value: any) {
        const newValues = form.values.parcelas as any ?? [];
        if (newValues[index]) {
            newValues[index][key] = value;
            form.setValue({
                parcelas: newValues
            })
        }
    }

    async function submit() {
        setLoading(true);
        const response = await api.fecth<any>({
            body: {
                ...form.values,
                tipo: props.tipo,
                parcelas: form.values.parcelas?.map((x) => {
                    return {
                        ...x,
                        desconto: cleanFormatMoney(x.desconto),
                        valor: cleanFormatMoney(x.valor)
                    }
                })
            }
        })
        setLoading(false);

        if (response) {
            navigate(props.urlVoltar)
        }
    }

    return (
        <Form
            action="create"
            title={titulo}
            urlVoltar={props.urlVoltar}
            submit={form.onSubmit}
            loading={loading}
        >
            <GridApp spacing={3}>
                <GridItemApp xs={12} sm={6}>
                    <DropDownScroll
                        id="usuarioId"
                        keyLabel={"nome"}
                        label={props.tipo === 0 ? "Fornecedor" : "Cliente"}
                        url="usuarios/paginacao-drop-down"
                        segundaKeyLabel="cnpj"
                        onChange={form.onChange}
                        error={form.error("usuarioId")}
                        helperText={form.helperText("usuarioId")}
                    />
                </GridItemApp>
                <GridItemApp xs={12} sm={3}>
                    <InputCustom
                        id="quantidadeDeParcelas"
                        label={"Quantidade de parcelas"}
                        onChange={form.onChange}
                        name={"quantidadeDeParcelas"}
                        value={form.values.quantidadeDeParcelas}
                        type="number"
                        onBlur={gerarParcelas}
                        fullWidth
                    />
                </GridItemApp>
                <GridItemApp xs={12} sm={3}>
                    <InputCustom
                        fullWidth
                        id="total"
                        onBlur={gerarParcelas}
                        label={"Quantidade de parcelas"}
                        onChange={form.onChange}
                        name={"total"}
                        value={form.values.total}
                        mask={MaskType.MONEY}
                    />
                </GridItemApp>
            </GridApp>
            <DividerApp chip="Parcelas" marginTop="1rem" />
            {form.values.parcelas?.map((parcela, index) => (
                <GridApp spacing={3} key={parcela.numeroDaFatura} marginTop="1rem">
                    <GridItemApp xs={12} sm={1}>
                        <BoxApp display="flex" alignItems="center" justifyContent="center" height="100%">
                            <Typography>#{parcela.numeroDaFatura}</Typography>
                        </BoxApp>
                    </GridItemApp>
                    <GridItemApp xs={12} sm={2}>
                        <InputCustom
                            fullWidth
                            id={`vencimento-${index}`}
                            label={"Vencimento"}
                            onChange={(_, value) => editParcela(index, 'dataDeVencimento', value)}
                            name={`vencimento-${index}`}
                            value={parcela.dataDeVencimento}
                            type="date"
                        />
                    </GridItemApp>
                    <GridItemApp xs={12} sm={3}>
                        <DropDown
                            id="id"
                            keyLabel="descricao"
                            label="Meio de pagamento"
                            values={meiosDePagamentos}
                            key={"id"}
                            value={meiosDePagamentos.find((x) => x.id === parcela.meioDePagamento)}
                            onChange={(_, value) => editParcela(index, 'meioDePagamento', value)}
                        />
                    </GridItemApp>
                    <GridItemApp xs={12} sm={3}>
                        <InputCustom
                            fullWidth
                            id={`valor-${index}`}
                            label={"Valor"}
                            name={`valor-${index}`}
                            value={parcela.valor}
                            mask={MaskType.MONEY}
                            onChange={(_, value) => editParcela(index, 'valor', value)}
                        />
                    </GridItemApp>
                    <GridItemApp xs={12} sm={3}>
                        <InputCustom
                            fullWidth
                            id={`desconto-${index}`}
                            label={"Desconto"}
                            name={`desconto-${index}`}
                            value={parcela.desconto}
                            mask={MaskType.MONEY}
                            onChange={(_, value) => editParcela(index, 'desconto', value)}
                        />
                    </GridItemApp>
                </GridApp>
            ))}
        </Form>
    )
}