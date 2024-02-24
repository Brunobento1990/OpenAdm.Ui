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
import { ITamanho } from "src/@open-adm/types/tamanho";

export function FormTamanho(props: IForm) {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const { post, get, put } = useApi<ITamanho>();
    const router = useRouter();
    const { query } = useRouterQuery();
    const title = props.action === 'create' ? 'Adicionar novo tamanho' : props.action === 'update' ? 'Editar tamanho' : 'Visualizar tamanho'

    const formik = useFormik({
        initialValues: defaultValues,
        validationSchema: schema,
        onSubmit: (values, helpers) => onSubmit(values),
    });

    async function init() {
        try {
            if (props.action !== 'create') {
                const response = await get(`tamanhos/get-tamanho?id=${query.id}`);
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
                await put('tamanhos/update', {
                    descricao: values.descricao,
                    id: query.id
                } as ITamanho)
            }

            if (props.action === 'create') {
                await post('tamanhos/create', {
                    descricao: values.descricao
                } as ITamanho)
            }
            router.replace('/estoque/tamanho')
        } catch (error) {

        }
    }

    return (
        <Form
            title={title}
            action={props.action}
            submit={formik.submitForm}
            urlVoltar="/estoque/tamanho"
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