import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CustomTextField from "src/@core/components/mui/text-field";
import { Form } from "src/@open-adm/components/form";
import { UploadImage } from "src/@open-adm/components/upload-image";
import { useApi } from "src/@open-adm/hooks/use-api";
import { IForm } from "src/@open-adm/types/form";
import { useRouter } from "next/router";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useFormik } from 'formik';
import { defaultValues, schema } from "../config";
import { useRouter as useRouterQuery } from 'next/router'
import { ICategoria } from "src/@open-adm/types/categoria";

export function FormCategoria(props: IForm) {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const [foto, setFoto] = useState<string>('');
    const { post, get, put } = useApi<ICategoria>();
    const router = useRouter();
    const { query } = useRouterQuery();
    const title = props.action === 'create' ? 'Adicionar nova categoria' : props.action === 'update' ? 'Editar categoria' : 'Visualizar categoria'

    const formik = useFormik({
        initialValues: defaultValues,
        validationSchema: schema,
        onSubmit: (values, helpers) => onSubmit(values),
    });

    async function init() {
        try {
            if (props.action !== 'create') {
                const response = await get(`categorias/get-categoria?id=${query.id}`);
                if (response) {
                    formik.setValues(response);
                    if (response?.foto) {
                        setFoto(`data:image/jpeg;base64,${response?.foto ?? ''}`);
                    }
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

            let newFoto = '';
            if (foto) {
                const index = foto.indexOf(',') + 1;
                newFoto = foto.slice(index);
            }

            if (props.action === "update") {
                await put('categorias/update', {
                    foto: newFoto,
                    descricao: values.descricao,
                    id: query.id
                } as ICategoria)
            }

            if (props.action === 'create') {
                await post('categorias/create', {
                    foto: newFoto,
                    descricao: values.descricao
                } as ICategoria)
            }
            router.replace('/estoque/categoria')
        } catch (error) {

        }
    }

    return (
        <Form
            title={title}
            action={props.action}
            submit={formik.submitForm}
            urlVoltar="/estoque/categoria"
        >
            <Box display='flex' alignItems='center' justifyContent='center' flexDirection='column' gap={10}>
                <Box sx={{ width: !matches ? '100%' : '80%' }}>
                    <CustomTextField
                        fullWidth
                        label='Descrição *'
                        name='descricao'
                        id='descricao'
                        value={formik.values.descricao}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        helperText={formik.touched.descricao && formik.errors.descricao}
                        error={!!(formik.touched.descricao && formik.errors.descricao)}
                    />
                </Box>
                <Box width='100%' display='flex' alignItems='center' justifyContent='center' gap={10} flexDirection={!matches ? 'column' : undefined}>
                    <Box display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
                        <UploadImage
                            upload={(ft) => setFoto(ft)}
                        />
                        <Typography>
                            Selecione uma imagem!
                        </Typography>
                    </Box>
                    <Box
                        component="img"
                        src={foto}
                        sx={{ width: '200px', height: '200px', borderRadius: '5px' }}
                    />
                </Box>
            </Box>
        </Form>
    )
}