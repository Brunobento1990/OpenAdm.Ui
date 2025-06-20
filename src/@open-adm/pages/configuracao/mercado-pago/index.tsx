import { useFormikAdapter } from "src/@open-adm/adapters/formik-adapter";
import { initialValues, schema } from "./config";
import { apiMercadoPago } from "./api-mercado-pago";
import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import { InputCustom } from "src/@open-adm/components/input";
import { useEffect } from "react";
import { FormApp } from "src/@open-adm/components/form";

export function MercadoPago() {

    const { cretarOrUpdate, getConfig } = apiMercadoPago();

    const form = useFormikAdapter({
        initialValues,
        validationSchema: schema,
        onSubmit: cretarOrUpdate
    });

    async function init() {
        const response = await getConfig();
        if (response) {
            form.setValue(response);
        }
    }

    useEffect(() => {
        init();
    }, [])

    return (
        <FormApp
            titulo="Configurações do mercado pago"
            submit={form.onSubmit}
        >
            <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                    <InputCustom
                        fullWidth
                        label='Public Key'
                        name='publicKey'
                        id='publicKey'
                        value={form.values.publicKey}
                        onBlur={form.onBlur}
                        onChange={form.onChange}
                        helperText={form.helperText("publicKey")}
                        error={form.error("publicKey")}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputCustom
                        fullWidth
                        label='Acess Token'
                        name='accessToken'
                        id='accessToken'
                        value={form.values.accessToken}
                        onBlur={form.onBlur}
                        onChange={form.onChange}
                        helperText={form.helperText("accessToken")}
                        error={form.error("accessToken")}
                        required
                    />
                </Grid>
            </Grid>
            <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                    <FormControlLabel
                        label='Cobrar de CPF'
                        control={
                            <Checkbox
                                checked={form.values?.cobrarCpf ?? false}
                                onChange={e => form.setValue({
                                    cobrarCpf: e.target.checked
                                })} />
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControlLabel
                        label='Cobrar de CNPJ'
                        control={
                            <Checkbox
                                checked={form.values?.cobrarCnpj ?? false}
                                onChange={e => form.setValue({
                                    cobrarCnpj: e.target.checked
                                })} />
                        }
                    />
                </Grid>
            </Grid>
            <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                    <InputCustom
                        fullWidth
                        label='Url web hook'
                        name='urlWebHook'
                        id='urlWebHook'
                        value={form.values.urlWebHook}
                        onBlur={form.onBlur}
                        onChange={form.onChange}
                        required
                        helperText={form.helperText("urlWebHook")}
                        error={form.error("urlWebHook")}
                    />
                </Grid>
            </Grid>
        </FormApp>
    )
}