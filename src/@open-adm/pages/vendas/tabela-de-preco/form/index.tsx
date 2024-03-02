import { useFormik } from "formik";
import { IForm } from "src/@open-adm/types/form";
import { defaultValues } from "../config";
import { ITabelaDePreco } from "src/@open-adm/types/tabela-de-preco";
import { Form } from "src/@open-adm/components/form";
import { useApi } from "src/@open-adm/hooks/use-api";
import { useRouter as useRouterQuery } from 'next/router'
//import { useRouter } from "next/router";
import { Grid, Typography } from "@mui/material";
import CustomTextField from "src/@core/components/mui/text-field";
import { useEffect } from "react";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { Box } from "@mui/system";

export function TabelaDePrecoForm(props: IForm) {

    const { get } = useApi<ITabelaDePreco>();
    //const router = useRouter();
    const { query } = useRouterQuery();

    const formik = useFormik({
        initialValues: defaultValues,
        onSubmit: (values) => onSubmit(values),
    });

    const title = props.action === 'create' ? 'Adicionar nova tabela de preço' : props.action === 'update' ? 'Editar tabela de preço' : 'Visualizar tabela de preço'

    async function onSubmit(values: ITabelaDePreco) {
        console.log(values);
    }

    async function init() {
        if (props.action !== 'create' && query.id) {
            const response = await get(`tabelas-de-precos/get-tabela?id=${query.id}`);
            if (response)
                formik.setValues(response);
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
            urlVoltar="/vendas/tabeladepreco"
        >
            <Grid container spacing={6}>
                <Grid item xs={12} sm={8}>
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
                </Grid>
                <Grid item xs={12} sm={4}>
                    <CustomTextField
                        fullWidth
                        label='Ativa no e-commerce'
                        name='ativaEcommerce'
                        id='ativaEcommerce'
                        value={formik.values.ativaEcommerce}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        helperText={formik.touched.ativaEcommerce && formik.errors.ativaEcommerce}
                        error={!!(formik.touched.ativaEcommerce && formik.errors.ativaEcommerce)}
                        required
                        InputProps={{
                            readOnly: props.action === 'view'
                        }}
                    />
                </Grid>
                <Box sx={{ width: '100%', height: '100%', padding: 6 }}>
                    <DataGrid
                        rows={formik.values.itensTabelaDePreco}
                        columns={[
                            {
                                field: 'numero',
                                headerName: 'Número',
                                renderCell: (params: GridRenderCellParams) => (
                                    <Typography variant='body2' sx={{ color: 'success' }}>
                                        #{params.row.numero}
                                    </Typography>
                                )
                            },
                            {
                                field: 'produto',
                                headerName: 'Produto',
                                flex: 0.200,
                                minWidth: 150,
                                renderCell: (params: GridRenderCellParams) => (
                                    <Typography variant='body2' sx={{ color: 'success' }}>
                                        {params.row.produto.descricao}
                                    </Typography>
                                )
                            },
                            {
                                field: 'tamanho',
                                headerName: 'Tamanho',
                                renderCell: (params: GridRenderCellParams) => (
                                    <Typography variant='body2' sx={{ color: 'success' }}>
                                        {params.row.tamanho?.descricao}
                                    </Typography>
                                )
                            },
                            {
                                field: 'peso',
                                headerName: 'Peso',
                                renderCell: (params: GridRenderCellParams) => (
                                    <Typography variant='body2' sx={{ color: 'success' }}>
                                        {params.row.peso?.descricao}
                                    </Typography>
                                )
                            },
                            {
                                field: 'valorUnitario',
                                headerName: 'Vlr unitário',
                                flex: 0.200,
                                minWidth: 80,
                                renderCell: (params: GridRenderCellParams) => (
                                    <Typography variant='body2' sx={{ color: 'success' }}>
                                        {params.row.valorUnitario?.toString().replace('.', ',')}
                                    </Typography>
                                )
                            }
                        ]}
                        autoHeight
                        hideFooterPagination
                    />
                </Box>
            </Grid>
        </Form>
    )
}