import { Grid } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { YupAdapter } from "src/@open-adm/adapters/yup-adapter";
import { Form } from "src/@open-adm/components/form";
import { InputDate } from "src/@open-adm/components/input/input-date";
import { useNewApi } from "src/@open-adm/hooks/use-new-api";
import { generatePdfFromBase64 } from "src/@open-adm/utils/download-pdf";

const defaultValues = {
    dataInicial: '',
    dataFinal: ''
}

export function RelatorioEstoque() {
    const [loading, setLoading] = useState(false);
    const api = useNewApi({
        method: 'POST',
        url: 'movimentacao-de-produto/relatorio',
        notAlert: true
    });
    const formik = useFormik({
        initialValues: defaultValues,
        validationSchema: new YupAdapter().string('dataInicial').string('dataFinal').build(),
        onSubmit: submit,
    });

    async function submit() {
        setLoading(true);
        const response = await api.fecth<any>({
            body: {
                ...formik.values
            },
            message: 'Download efetuado com sucesso!'
        });
        if (response?.pdf) {
            const pdf = await generatePdfFromBase64(response.pdf);
            const link = document.createElement('a');
            link.href = pdf;
            link.download = `${formik.values.dataInicial}-${formik.values.dataFinal}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        setLoading(false);
    }

    return (
        <Form
            action="create"
            submit={formik.submitForm}
            title="Relatório de estoque"
            titleButton="Download"
            loading={loading}
        >
            <Grid container spacing={5}>
                <Grid item xs={12} sm={4}>
                    <InputDate
                        fullWidth
                        id="dataInicial"
                        label="Data inicial"
                        name="dataInicial"
                        value={formik.values.dataInicial}
                        required
                        helperText={formik.touched.dataInicial && formik.errors.dataInicial}
                        error={!!(formik.touched.dataInicial && formik.errors.dataInicial)}
                        onChange={(_, value) => {
                            formik.setValues({
                                ...formik.values,
                                dataInicial: value
                            })
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <InputDate
                        fullWidth
                        id="dataFinal"
                        label="Data final"
                        name="dataFinal"
                        value={formik.values.dataFinal}
                        required
                        helperText={formik.touched.dataFinal && formik.errors.dataFinal}
                        error={!!(formik.touched.dataFinal && formik.errors.dataFinal)}
                        onChange={(_, value) => {
                            formik.setValues({
                                ...formik.values,
                                dataFinal: value
                            })
                        }}
                    />
                </Grid>
            </Grid>
        </Form>
    )
}