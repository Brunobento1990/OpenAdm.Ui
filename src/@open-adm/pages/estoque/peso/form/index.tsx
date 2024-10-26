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
import { useFormikAdapter } from "src/@open-adm/adapters/formik-adapter";
import { InputCustom } from "src/@open-adm/components/input";

export function FormPeso(props: IForm) {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const { post, get, put } = useApi();
    const router = useRouter();
    const { query } = useRouterQuery();
    const title = props.action === 'create' ? 'Adicionar novo peso' : props.action === 'update' ? 'Editar peso' : 'Visualizar peso'

    const formik = useFormikAdapter<IPeso>({
        initialValues: defaultValues,
        validationSchema: schema,
        onSubmit: onSubmit,
    });

    async function init() {
        try {
            if (props.action !== 'create') {
                const response = await get<IPeso>(`pesos/get-peso?id=${query.id}`);
                if (response) {
                    formik.setValue(response);
                }
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        init();
    }, [])

    async function onSubmit() {

        try {

            if (props.action === "update") {
                await put('pesos/update', {
                    ...formik.values
                } as IPeso)
            }

            if (props.action === 'create') {
                await post('pesos/create', {
                    ...formik.values
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
            submit={formik.onSubmit}
            urlVoltar="/estoque/peso"
        >
            <Box display='flex' alignItems='center' justifyContent='center' flexDirection='column' gap={10}>
                <Box sx={{ width: !matches ? '100%' : '80%' }}>
                    <InputCustom
                        fullWidth
                        label='Descrição'
                        name='descricao'
                        id='descricao'
                        value={formik.values.descricao}
                        onBlur={formik.onBlur}
                        onChange={formik.onChange}
                        helperText={formik.helperText('descricao')}
                        error={formik.error('descricao')}
                        required
                        maxLength={255}
                        readonly={props.action === 'view'}
                    />
                </Box>
                <Box sx={{ width: !matches ? '100%' : '80%' }}>
                    <InputCustom
                        fullWidth
                        readonly={props.action === 'view'}
                        label='Peso real (gramas)'
                        name='pesoReal'
                        id='pesoReal'
                        value={formik.values.pesoReal}
                        onBlur={formik.onBlur}
                        onChange={formik.onChange}
                        type="number"
                    />
                </Box>
            </Box>
        </Form>
    )
}