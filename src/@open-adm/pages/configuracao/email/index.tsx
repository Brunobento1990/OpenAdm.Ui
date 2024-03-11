import { useFormik } from "formik";
import { useEffect } from "react";
import { Form } from "src/@open-adm/components/form";
import { useApi } from "src/@open-adm/hooks/use-api";
import { IConfiguracaoDeEmail } from "src/@open-adm/types/configuracao-email";
import { defaultValues, schema } from "./config";
import { Grid } from "@mui/material";
import CustomTextField from "src/@core/components/mui/text-field";
import { useRouter } from "next/router";

export function ConfiguracaoEmail() {

    const { get, post } = useApi();
    const router = useRouter();

    const formik = useFormik({
        initialValues: defaultValues,
        validationSchema: schema,
        onSubmit: (values) => onSubmit(values),
    });

    async function onSubmit(values: IConfiguracaoDeEmail) {
        try {
            await post('configuracoes-de-email/create', values)
            router.replace('/home')
        } catch (error) {
            
        }
    }

    async function init() {
        try {
            const response = await get<IConfiguracaoDeEmail>('configuracoes-de-email/get-configuracao')
            if (response)
                formik.setValues(response);
        } catch (error) {

        }
    }

    useEffect(() => {
        init();
    }, [])

    return (
        <Form
            action='update'
            submit={formik.submitForm}
            title="Configuração de e-mail"
            urlVoltar="/home"
        >
            <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        fullWidth
                        label='E-mail'
                        name='email'
                        id='email'
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        helperText={formik.touched.email && formik.errors.email}
                        error={!!(formik.touched.email && formik.errors.email)}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        fullWidth
                        label='Senha'
                        name='senha'
                        id='senha'
                        value={formik.values.senha}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        helperText={formik.touched.senha && formik.errors.senha}
                        error={!!(formik.touched.senha && formik.errors.senha)}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        fullWidth
                        label='Servidor'
                        name='servidor'
                        id='servidor'
                        value={formik.values.servidor}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        helperText={formik.touched.servidor && formik.errors.servidor}
                        error={!!(formik.touched.servidor && formik.errors.servidor)}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        fullWidth
                        label='Porta'
                        name='porta'
                        id='porta'
                        value={formik.values.porta}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        helperText={formik.touched.porta && formik.errors.porta}
                        error={!!(formik.touched.porta && formik.errors.porta)}
                        required
                        type="number"
                    />
                </Grid>
            </Grid>
        </Form>
    )
}