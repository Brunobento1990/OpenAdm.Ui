import { useFormikAdapter } from "src/@open-adm/adapters/formik-adapter"
import { initialValues, schema } from "./config"
import { useApiConfiguracaoDeFrete } from "./use-api-configuracao-de-frete";
import { useEffect } from "react";
import { Form } from "src/@open-adm/components/form";
import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import { InputCustom } from "src/@open-adm/components/input";
import { useNavigateApp } from "src/@open-adm/hooks/use-navigate-app";
import { IConfiguracaoDeFrete } from "src/@open-adm/types/configuracao-de-frete";

export function ConfiguracaoDeFrete() {
    const { navigate } = useNavigateApp();
    const form = useFormikAdapter<IConfiguracaoDeFrete>({
        initialValues,
        validationSchema: schema,
        onSubmit: submit
    })

    const { get, create } = useApiConfiguracaoDeFrete();

    async function init() {
        const response = await get();
        if (response) {
            form.setValue(response);
        }

    }

    async function submit(values: any) {
        const response = await create(values);
        if (response) {
            navigate("/home")
        }
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <Form
            action="update"
            title="Configurações de frete"
            submit={form.onSubmit}
        >
            <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                    <InputCustom
                        fullWidth
                        label='CEP de origem'
                        name='cepOrigem'
                        id='cepOrigem'
                        value={form.values.cepOrigem}
                        onBlur={form.onBlur}
                        onChange={form.onChange}
                        helperText={form.helperText("cepOrigem")}
                        error={form.error("cepOrigem")}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputCustom
                        fullWidth
                        label='Altura da embalagem (cm)'
                        name='alturaEmbalagem'
                        id='alturaEmbalagem'
                        value={form.values.alturaEmbalagem}
                        onBlur={form.onBlur}
                        onChange={form.onChange}
                        helperText={form.helperText("alturaEmbalagem")}
                        error={form.error("alturaEmbalagem")}
                        required
                    />
                </Grid>
            </Grid>
            <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                    <InputCustom
                        fullWidth
                        label='Largura da embalagem (cm)'
                        name='larguraEmbalagem'
                        id='larguraEmbalagem'
                        value={form.values.larguraEmbalagem}
                        onBlur={form.onBlur}
                        onChange={form.onChange}
                        helperText={form.helperText("larguraEmbalagem")}
                        error={form.error("larguraEmbalagem")}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputCustom
                        fullWidth
                        label='Comprimento (cm)'
                        name='comprimentoEmbalagem'
                        id='comprimentoEmbalagem'
                        value={form.values.comprimentoEmbalagem}
                        onBlur={form.onBlur}
                        onChange={form.onChange}
                        helperText={form.helperText("comprimentoEmbalagem")}
                        error={form.error("comprimentoEmbalagem")}
                        required
                    />
                </Grid>
            </Grid>
            <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                    <InputCustom
                        fullWidth
                        label='Peso (gr)'
                        name='peso'
                        id='peso'
                        value={form.values.peso}
                        onBlur={form.onBlur}
                        onChange={form.onChange}
                        type="number"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputCustom
                        fullWidth
                        label='Chave api'
                        name='chaveApi'
                        id='chaveApi'
                        value={form.values.chaveApi}
                        onBlur={form.onBlur}
                        onChange={form.onChange}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={6}>
                <Grid item xs={12} sm={4}>
                    <FormControlLabel
                        label='Cobrar de CPF'
                        control={
                            <Checkbox
                                checked={form.values.cobrarCpf ?? false}
                                onChange={e => form.setValue({
                                    cobrarCpf: e.target.checked
                                })} />
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControlLabel
                        label='Cobrar de CNPJ'
                        control={
                            <Checkbox
                                checked={form.values.cobrarCnpj ?? false}
                                onChange={e => form.setValue({
                                    cobrarCnpj: e.target.checked
                                })} />
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControlLabel
                        label='Inativar'
                        control={
                            <Checkbox
                                checked={form.values.inativo ?? false}
                                onChange={e => form.setValue({
                                    inativo: e.target.checked
                                })} />
                        }
                    />
                </Grid>
            </Grid>
        </Form>
    );
}