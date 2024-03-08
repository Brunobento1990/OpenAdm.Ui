import CustomTextField from "src/@core/components/mui/text-field";
import { Form } from "src/@open-adm/components/form";
import { useApi } from "src/@open-adm/hooks/use-api";
import { IForm } from "src/@open-adm/types/form";
import { useRouter } from "next/router";
import { useFormik } from 'formik';
import { defaultValues, schema } from "../config";
import { useRouter as useRouterQuery } from 'next/router'
import { ILojasParceiras } from "src/@open-adm/types/lojas-parceiras";
import { Box, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { clearMaskPhone, maskPhone } from "src/@open-adm/utils/mask";
import { UploadImage } from "src/@open-adm/components/upload-image";

export function FormLojasParceiras(props: IForm) {

    const { post, get, put } = useApi<ILojasParceiras>();
    const router = useRouter();
    const { query } = useRouterQuery();
    const title = props.action === 'create' ? 'Adicionar loja parceira' : props.action === 'update' ? 'Editar loja parceira' : 'Visualizar loja parceira'

    const formik = useFormik({
        initialValues: defaultValues,
        validationSchema: schema,
        onSubmit: (values) => onSubmit(values),
    });

    async function onSubmit(lojaParceira: ILojasParceiras) {

        let newFoto = '';

        if (lojaParceira.foto) {
            const index = lojaParceira.foto.indexOf(',') + 1;
            newFoto = lojaParceira.foto.slice(index);
        }

        if (props.action === 'update') {
            await put('lojas-parceiras/update', {
                ...lojaParceira,
                foto: newFoto,
                contato: clearMaskPhone(lojaParceira.contato)
            })
        }

        if (props.action === 'create') {
            await post('lojas-parceiras/create', {
                ...lojaParceira,
                foto: newFoto,
                contato: clearMaskPhone(lojaParceira.contato)
            })
        }
        router.replace('/lojas-parceiras')
    }

    async function init() {
        if (props.action !== 'create' && query.id) {
            const response = await get(`lojas-parceiras/get-loja?id=${query.id}`);
            if (response) {
                formik.setValues(response);
            }
        }
    }

    useEffect(() => {
        init();
    }, [])

    return (
        <Form
            action={props.action}
            submit={formik.submitForm}
            title={title}
            urlVoltar="/lojas-parceiras"
        >
            <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        fullWidth
                        label='Nome da loja'
                        name='nome'
                        id='nome'
                        placeholder="Ex: Open adm"
                        value={formik.values.nome}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        helperText={formik.touched.nome && formik.errors.nome}
                        error={!!(formik.touched.nome && formik.errors.nome)}
                        required
                        InputProps={{
                            readOnly: props.action === 'view'
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        fullWidth
                        label='Contato'
                        name='contato'
                        id='contato'
                        value={maskPhone(formik.values.contato)}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        placeholder="Ex: (99) 99999-9999"
                        InputProps={{
                            readOnly: props.action === 'view'
                        }}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        fullWidth
                        label='Link do facebook'
                        name='facebook'
                        id='facebook'
                        value={formik.values.facebook}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        placeholder="Ex: https://facebook/loja-parceira"
                        InputProps={{
                            readOnly: props.action === 'view'
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        fullWidth
                        label='Link do instagram'
                        name='instagram'
                        id='instagram'
                        value={formik.values.instagram}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        placeholder="Ex: https://instagram/loja-parceira"
                        InputProps={{
                            readOnly: props.action === 'view'
                        }}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                    <CustomTextField
                        fullWidth
                        label='Endereço'
                        name='endereco'
                        id='endereco'
                        value={formik.values.endereco}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        placeholder="Ex: Rua teste N 32"
                        InputProps={{
                            readOnly: props.action === 'view'
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    {props.action !== 'view' &&
                        <Box display='flex' alignItems='center'>
                            <UploadImage
                                upload={(ft) => formik.setValues({
                                    ...formik.values,
                                    foto: ft
                                })}
                            />
                            <Typography>
                                Selecione uma imagem!
                            </Typography>
                        </Box>
                    }
                    <Box
                        component="img"
                        src={formik.values.foto}
                        sx={{ width: '200px', height: '200px', borderRadius: '5px', marginTop: props.action === 'view' ? 2 : undefined }}
                    />
                </Grid>
            </Grid>
        </Form>
    )
}