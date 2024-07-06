import { useApi } from "src/@open-adm/hooks/use-api"
import { defaultValues, schema } from "./config";
import { IConfiguracaoDePedido } from "src/@open-adm/types/configuracao-pedido";
import { Form } from "src/@open-adm/components/form";
import { Grid } from "@mui/material";
import FileUploaderSingle from "src/@open-adm/components/upload";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { InputCustom, MaskType } from "src/@open-adm/components/input";
import { cleanFormatMoney } from "src/@open-adm/utils/format-money";
import { useFormikAdapter } from "src/@open-adm/adapters/formik-adapter";

export function ConfiguracaoPedido() {

    const { get, put } = useApi();
    const router = useRouter();

    const formik = useFormikAdapter({
        initialValues: defaultValues,
        validationSchema: schema,
        onSubmit: (values) => onSubmit(values),
    });

    async function onSubmit(values: IConfiguracaoDePedido) {
        await put('configuracoes-de-pedido/update', {
            ...values,
            pedidoMinimoAtacado: cleanFormatMoney(values.pedidoMinimoAtacado),
            pedidoMinimoVarejo: cleanFormatMoney(values.pedidoMinimoVarejo),
        });
        router.replace('/home');
    }

    async function init() {
        const response = await get<IConfiguracaoDePedido>('configuracoes-de-pedido/get-configuracoes')
        if (response) {
            formik.setValue(response);
        }
    }

    useEffect(() => {
        init();
    }, [])

    return (
        <Form
            action="update"
            submit={formik.onSubmit}
            title="Configurações de pedido"
        >
            <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                    <InputCustom
                        fullWidth
                        label='Pedido mínimo atacado'
                        name='pedidoMinimoAtacado'
                        id='pedidoMinimoAtacado'
                        value={formik.values.pedidoMinimoAtacado}
                        onBlur={formik.onBlur}
                        onChange={formik.onChange}
                        mask={MaskType.MONEY}
                        type="text"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputCustom
                        fullWidth
                        label='Pedido mínimo varejo'
                        name='pedidoMinimoVarejo'
                        id='pedidoMinimoVarejo'
                        value={formik.values.pedidoMinimoVarejo}
                        onBlur={formik.onBlur}
                        onChange={formik.onChange}
                        mask={MaskType.MONEY}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                    <InputCustom
                        fullWidth
                        label='E-mail para receber o pedido'
                        name='emailDeEnvio'
                        id='emailDeEnvio'
                        value={formik.values.emailDeEnvio}
                        onBlur={formik.onBlur}
                        onChange={formik.onChange}
                        helperText={formik.helperText("emailDeEnvio")}
                        error={formik.error("emailDeEnvio")}
                        required
                    />
                </Grid>
            </Grid>
            <FileUploaderSingle
                title="Selecione uma logo para o pdf de pedido"
                maringTop={5}
                setFoto={(ft: any) => formik.setValue({
                    logo: ft
                })}
                defaultValue={formik.values.logo}
            />
        </Form>
    )
}