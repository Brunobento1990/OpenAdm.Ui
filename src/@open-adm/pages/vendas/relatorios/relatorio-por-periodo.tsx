import { Grid } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import CustomTextField from "src/@core/components/mui/text-field";
import { YupAdapter } from "src/@open-adm/adapters/yup-adapter";
import { Form } from "src/@open-adm/components/form";
import SelectCustom from "src/@open-adm/components/select";
import { useSnackbar } from "src/@open-adm/components/snack";
import { useApi } from "src/@open-adm/hooks/use-api";
import { generatePdfFromBase64 } from "src/@open-adm/utils/download-pdf";

const defaultValues = {
    dataInicial: '',
    dataFinal: '',
    usuarioId: ''
}

export function RelatorioPorPeriodo() {
    const [usuarios, setUsuarios] = useState<any[]>([]);
    const { post, get } = useApi();
    const snack = useSnackbar();
    const formik = useFormik({
        initialValues: defaultValues,
        validationSchema: new YupAdapter().string('dataInicial').string('dataFinal').build(),
        onSubmit: (values) => submit(values),
    });

    async function init() {
        const response = await get<any>('usuarios/list');
        if (response) {
            setUsuarios(response);
        }
    }

    async function submit(values: any) {
        try {
            if (!values.usuarioId) {
                delete values.usuarioId;
            }
            const response = await post('pedidos/relatorio-por-periodo', values, 'Download efetuado com sucesso!');
            if (response?.count === 0) {
                snack.show('Não há pedidos para o período selecionado!', 'error');
                return;
            }
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

    useEffect(() => {
        init();
    }, [])

    return (
        <Form
            action="create"
            submit={formik.submitForm}
            title="Relatório por período"
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
                <Grid item xs={12} sm={4}>
                    <SelectCustom
                        id='usuarios'
                        getOptionLabel={option => option.nome || ''}
                        onInputChange={(_, newInputValue) => formik.setValues({
                            ...formik.values,
                            usuarioId: usuarios.find((x) => x.nome === newInputValue)?.id
                        })}
                        options={usuarios}
                        renderInput={params =>
                            <CustomTextField
                                {...params}
                                label='Selecione um cliente'
                            />
                        }
                    />
                </Grid>
            </Grid>
        </Form>
    )
}