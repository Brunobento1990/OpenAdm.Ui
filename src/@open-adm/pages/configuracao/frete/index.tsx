import { useFormikAdapter } from "src/@open-adm/adapters/formik-adapter"
import { initialValues, schema } from "./config"
import { useApiConfiguracaoDeFrete } from "./use-api-configuracao-de-frete";
import { useEffect } from "react";
import { Form } from "src/@open-adm/components/form";
import { Grid } from "@mui/material";
import { InputCustom } from "src/@open-adm/components/input";

export function ConfiguracaoDeFrete() {
    const form = useFormikAdapter({
        initialValues,
        validationSchema: schema,
        onSubmit: submit
    })

    const { get, create } = useApiConfiguracaoDeFrete();

    async function init() {
        try {
            const response = await get();
            if (response) {
                form.setValue(response);
            }
        } catch (error) {

        }
    }

    async function submit(values: any) {
        try {
            await create(values);
        } catch (error) {

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
                        label='Peso (kg)'
                        name='peso'
                        id='peso'
                        value={form.values.peso}
                        onBlur={form.onBlur}
                        onChange={form.onChange}
                        type="number"
                    />
                </Grid>
            </Grid>
        </Form>
    );
}