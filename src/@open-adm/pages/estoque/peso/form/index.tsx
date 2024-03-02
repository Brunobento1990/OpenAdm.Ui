import { Box } from "@mui/material";
import { useEffect } from "react";
import CustomTextField from "src/@core/components/mui/text-field";
import { Form } from "src/@open-adm/components/form";
import { useApi } from "src/@open-adm/hooks/use-api";
import { IForm } from "src/@open-adm/types/form";
import { useRouter } from "next/router";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useFormik } from 'formik';
import { defaultValues, schema } from "../config";
import { useRouter as useRouterQuery } from 'next/router'
import { IPeso } from "src/@open-adm/types/peso";

export function FormPeso(props: IForm) {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const { post, get, put } = useApi<IPeso>();
    const router = useRouter();
    const { query } = useRouterQuery();
    const title = props.action === 'create' ? 'Adicionar novo peso' : props.action === 'update' ? 'Editar peso' : 'Visualizar peso'

    const formik = useFormik({
        initialValues: defaultValues,
        validationSchema: schema,
        onSubmit: (values) => onSubmit(values),
    });

    async function init() {
        try {
            if (props.action !== 'create') {
                const response = await get(`pesos/get-peso?id=${query.id}`);
                if (response) {
                    formik.setValues(response);
                }
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        init();
    }, [])

    async function onSubmit(values: any) {

        try {

            if (props.action === "update") {
                await put('pesos/update', {
                    descricao: values.descricao,
                    id: query.id
                } as IPeso)
            }

            if (props.action === 'create') {
                await post('pesos/create', {
                    descricao: values.descricao
                } as IPeso)
            }
            router.replace('/estoque/peso')
        } catch (error) {

        }
    }

    return (
        <Form
            title={title}
            action={props.action}
            submit={formik.submitForm}
            urlVoltar="/estoque/peso"
        >
            <Box display='flex' alignItems='center' justifyContent='center' flexDirection='column' gap={10}>
                <Box sx={{ width: !matches ? '100%' : '80%' }}>
                    <CustomTextField
                        fullWidth
                        label='Descrição'
                        name='descricao'
                        id='descricao'
                        value={formik.values.descricao}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        helperText={formik.touched.descricao && formik.errors.descricao}
                        error={!!(formik.touched.descricao && formik.errors.descricao)}
                        required
                        InputProps={{
                            readOnly: props.action === 'view'
                        }}
                    />
                </Box>
            </Box>
        </Form>
    )
}