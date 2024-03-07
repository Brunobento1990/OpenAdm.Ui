import { useEffect } from "react"
import { useApi } from "src/@open-adm/hooks/use-api";
import { useRouter as useRouterQuery } from 'next/router'
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { defaultValues, schema } from "../config";
import { IEstoqueEdit } from "src/@open-adm/types/estoque";
import { Form } from "src/@open-adm/components/form";
import { Typography } from "@mui/material";
import CustomTextField from "src/@core/components/mui/text-field";
import { Box } from "@mui/system";

export function FormEstoque() {

    const { get, put } = useApi<any>();
    const router = useRouter();
    const { query } = useRouterQuery();

    const formik = useFormik({
        initialValues: defaultValues,
        validationSchema: schema,
        onSubmit: (values) => onSubmit(values),
    });

    async function onSubmit(estoque: IEstoqueEdit) {
        await put('estoques/update', estoque);
        router.replace('/estoque/posicao-estoque')
    }

    async function init() {
        const estoqueResponse = await get(`estoques/get-estoque?id=${query.id}`);

        if (estoqueResponse) {
            formik.setValues(estoqueResponse);
        }
    }

    useEffect(() => {
        init();
    }, [])

    return (
        <Form
            action="edit"
            submit={formik.submitForm}
            title="Atualizar estoque"
            urlVoltar="/estoque/posicao-estoque"
        >
            <Box display='flex' gap={10} alignItems='center' padding={5}>
                <Typography>
                    Produto : {formik.values.produto}
                </Typography>
                <CustomTextField
                    label='Quantidade'
                    name='quantidade'
                    id='quantidade'
                    value={formik.values.quantidade}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="number"
                    helperText={formik.touched.quantidade && formik.errors.quantidade}
                    error={!!(formik.touched.quantidade && formik.errors.quantidade)}
                />
            </Box>
        </Form>
    )
}