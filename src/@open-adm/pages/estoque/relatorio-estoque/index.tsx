import { Grid } from "@mui/material";
import { useFormik } from "formik";
import CustomTextField from "src/@core/components/mui/text-field";
import { YupAdapter } from "src/@open-adm/adapters/yup-adapter";
import { Form } from "src/@open-adm/components/form";
import { useApi } from "src/@open-adm/hooks/use-api";
import { generatePdfFromBase64 } from "src/@open-adm/utils/download-pdf";

const defaultValues = {
    dataInicial: '',
    dataFinal: ''
}

export function RelatorioEstoque() {
    const { post } = useApi();
    const formik = useFormik({
        initialValues: defaultValues,
        validationSchema: new YupAdapter().string('dataInicial').string('dataFinal').build(),
        onSubmit: (values) => submit(values),
    });

    async function submit(values: any) {
        try {
            const response = await post('movimentacao-de-produto/relatorio', values, 'Download efetuado com sucesso!');
            if (response?.pdf) {
                const pdf = await generatePdfFromBase64(response.pdf);
                const link = document.createElement('a');
                link.href = pdf;
                link.download = `${formik.values.dataInicial}-${formik.values.dataFinal}.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } catch (error) {

        }
    }

    return (
        <Form
            action="create"
            submit={formik.submitForm}
            title="Relatório de estoque"
            titleButton="Download"
        >
            <Grid container spacing={5}>
                <Grid item xs={12} sm={4}>
                    <CustomTextField
                        fullWidth
                        label='Data inicial'
                        name='dataInicial'
                        id='dataInicial'
                        required
                        value={formik.values.dataInicial}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        helperText={formik.touched.dataInicial && formik.errors.dataInicial}
                        error={!!(formik.touched.dataInicial && formik.errors.dataInicial)}
                        type="date"
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <CustomTextField
                        fullWidth
                        label='Data final'
                        name='dataFinal'
                        id='dataFinal'
                        required
                        value={formik.values.dataFinal}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        helperText={formik.touched.dataFinal && formik.errors.dataFinal}
                        error={!!(formik.touched.dataFinal && formik.errors.dataFinal)}
                        type="date"
                    />
                </Grid>
            </Grid>
        </Form>
    )
}