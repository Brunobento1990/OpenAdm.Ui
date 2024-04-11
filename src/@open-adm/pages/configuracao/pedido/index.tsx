import { useFormik } from "formik";
import { useApi } from "src/@open-adm/hooks/use-api"
import { defaultValues, schema } from "./config";
import { IConfiguracaoDePedido } from "src/@open-adm/types/configuracao-pedido";
import { Form } from "src/@open-adm/components/form";
import { Grid } from "@mui/material";
import CustomTextField from "src/@core/components/mui/text-field";
import FileUploaderSingle from "src/@open-adm/components/upload";
import { useEffect } from "react";
import { useRouter } from "next/router";

export function ConfiguracaoPedido() {

    const { get, put } = useApi();
    const router = useRouter();

    const formik = useFormik({
        initialValues: defaultValues,
        validationSchema: schema,
        onSubmit: (values) => onSubmit(values),
    });

    async function onSubmit(values: IConfiguracaoDePedido) {
        await put('configuracoes-de-pedido/update', values);
        router.replace('/home');
    }

    async function init() {
        const response = await get<IConfiguracaoDePedido>('configuracoes-de-pedido/get-configuracoes')
        if (response) {
            formik.setValues(response);
        }
    }

    useEffect(() => {
        init();
    }, [])

    return (
        <Form
            action="update"
            submit={formik.submitForm}
            title="Configurações de pedido"
        >
            {formik.values.emailDeEnvio &&
                <>
                    <Grid container spacing={6}>
                        <Grid item xs={12} sm={6}>
                            <CustomTextField
                                fullWidth
                                label='Pedido mínimo atacado'
                                name='pedidoMinimoAtacado'
                                id='pedidoMinimoAtacado'
                                value={formik.values.pedidoMinimoAtacado}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <CustomTextField
                                fullWidth
                                label='Pedido mínimo varejo'
                                name='pedidoMinimoVarejo'
                                id='pedidoMinimoVarejo'
                                value={formik.values.pedidoMinimoVarejo}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                type="number"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={6}>
                        <Grid item xs={12} sm={6}>
                            <CustomTextField
                                fullWidth
                                label='E-mail para receber o pedido'
                                name='emailDeEnvio'
                                id='emailDeEnvio'
                                value={formik.values.emailDeEnvio}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                helperText={formik.touched.emailDeEnvio && formik.errors.emailDeEnvio}
                                error={!!(formik.touched.emailDeEnvio && formik.errors.emailDeEnvio)}
                                required
                            />
                        </Grid>
                    </Grid>
                    <FileUploaderSingle
                        title="Selecione uma logo para o pdf de pedido"
                        maringTop={5}
                        setFoto={(ft: any) => formik.setValues({
                            ...formik.values,
                            logo: ft
                        })}
                        defaultValue={formik.values.logo}
                    />
                </>
            }
        </Form>
    )
}