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
import { useFormikAdapter } from "src/@open-adm/adapters/formik-adapter";
import { InputCustom } from "src/@open-adm/components/input";

export function FormTamanho(props: IForm) {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const { post, get, put } = useApi();
    const router = useRouter();
    const { query } = useRouterQuery();
    const title = props.action === 'create' ? 'Adicionar novo tamanho' : props.action === 'update' ? 'Editar tamanho' : 'Visualizar tamanho'

    const formik = useFormikAdapter<ITamanho>({
        initialValues: defaultValues,
        validationSchema: schema,
        onSubmit: onSubmit,
    });

    async function init() {
        try {
            if (props.action !== 'create') {
                const response = await get<ITamanho>(`tamanhos/get-tamanho?id=${query.id}`);
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
                await put('tamanhos/update', formik.values)
            }

            if (props.action === 'create') {
                await post('tamanhos/create', formik.values)
            }
            router.replace('/estoque/tamanho')
        } catch (error) {

        }
    }

    return (
        <Form
            title={title}
            action={props.action}
            submit={formik.onSubmit}
            urlVoltar="/estoque/tamanho"
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
                        readonly={props.action === 'view'}
                        maxLength={255}
                    />
                </Box>
                <Box sx={{ width: !matches ? '100%' : '80%' }}>
                    <InputCustom
                        fullWidth
                        label='Peso real (gramas)'
                        name='pesoReal'
                        id='pesoReal'
                        value={formik.values.pesoReal}
                        onBlur={formik.onBlur}
                        onChange={formik.onChange}
                        type="number"
                        readonly={props.action === 'view'}
                    />
                </Box>
            </Box>
        </Form>
    )
}