import { useFormik } from "formik";
import { IForm } from "src/@open-adm/types/form";
import { defaultValues, schema } from "../config";
import { IItensTabelaDePreco, ITabelaDePreco } from "src/@open-adm/types/tabela-de-preco";
import { Form } from "src/@open-adm/components/form";
import { useApi } from "src/@open-adm/hooks/use-api";
import { useRouter as useRouterQuery } from 'next/router'
import { useRouter } from "next/router";
import { Button, Checkbox, FormControlLabel, FormGroup, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import CustomTextField from "src/@core/components/mui/text-field";
import { useEffect, useState } from "react";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import { ModalWithChildren } from "src/@open-adm/components/modal";
import { IProduto } from "src/@open-adm/types/produto";
import SelectCustom from "src/@open-adm/components/select";
import IconifyIcon from "src/@core/components/icon";
import { useSnackbar } from "src/@open-adm/components/snack";

export function TabelaDePrecoForm(props: IForm) {

    const snack = useSnackbar();
    const [open, setOpen] = useState(false);
    const [produtos, setProdutos] = useState<IProduto[]>([]);
    const [pesos, setPesos] = useState<IProduto[]>([]);
    const [tamanhos, setTamanhos] = useState<IProduto[]>([]);
    const [item, setItem] = useState<IItensTabelaDePreco>();
    const { get, post, deleteApi, put } = useApi<any>();
    const router = useRouter();
    const { query } = useRouterQuery();

    const formik = useFormik({
        initialValues: defaultValues,
        validationSchema: schema,
        onSubmit: (values) => onSubmit(values),
    });

    const title = props.action === 'create' ? 'Adicionar nova tabela de preço' : props.action === 'update' ? 'Editar tabela de preço' : 'Visualizar tabela de preço'

    async function onSubmit(values: ITabelaDePreco) {
        try {
            if (props.action === 'update') {
                await put('tabelas-de-precos/update', {
                    id: query.id,
                    descricao: values.descricao,
                    ativaEcommerce: values.ativaEcommerce
                })
            }

            if (props.action === 'create') {
                const body = {
                    descricao: values.descricao,
                    ativaEcommerce: values.ativaEcommerce,
                    itensTabelaDePreco: values.itensTabelaDePreco.map((x) => {
                        return {
                            valorUnitarioAtacado: x.valorUnitarioAtacado,
                            valorUnitarioVarejo: x.valorUnitarioVarejo,
                            tamanhoId: x.tamanhoId,
                            produtoId: x.produtoId,
                            pesoId: x.pesoId
                        }
                    })
                }
                await post('tabelas-de-precos/create', body)
            }

            router.replace('/vendas/tabeladepreco')
        } catch (error) {

        }
    }

    async function initDependencias() {
        const [responseProdutos, responsePesos, responseTamanhos]
            = await Promise.all([get('produtos/all-list'), get('pesos/list'), get('tamanhos/list')])

        setProdutos(responseProdutos ?? []);
        setTamanhos(responseTamanhos ?? []);
        setPesos(responsePesos ?? []);
    }

    async function init() {
        if (props.action !== 'create' && query.id) {
            const response = await get(`tabelas-de-precos/get-tabela?id=${query.id}`);
            if (response)
                formik.setValues(response);
        } else {
            formik.setValues(defaultValues);
        }
    }

    async function addItemTabelaDePreco() {

        try {
            setOpen(false);

            if (!item) {
                return;
            }

            if (!item.valorUnitarioAtacado || !item.valorUnitarioVarejo) {
                snack.show('Informe o vaor unitário do atacado ou do varejo!', 'info')
            }

            if (!item?.produtoId) {
                snack.show('Informe o produto!', 'info');
                return;
            }

            const body = {
                ...item,
                tabelaDePrecoId: formik.values.id
            }

            if (props.action === 'update') {
                await post('item-tabela-de-preco/create', body);
            }

            const tabela = formik.values;
            tabela.itensTabelaDePreco = [{
                ...body,
                id: (tabela.itensTabelaDePreco.length + 1).toString(),
                numero: tabela.itensTabelaDePreco.reduce((a, b) => a + b.numero, 0)
            } as IItensTabelaDePreco, ...tabela.itensTabelaDePreco]
            formik.setValues(tabela)
            setOpen(false)
            setItem(undefined);
        } catch (error) {

        }
    }

    async function excluir(id: string) {
        try {
            if (props.action === 'update') {
                await deleteApi(`item-tabela-de-preco/delete?id=${id}`)
            }
            const tabela = formik.values;
            tabela.itensTabelaDePreco = [...tabela.itensTabelaDePreco.filter((x) => x.id !== id)]
            formik.setValues(tabela)
        } catch (error) {

        }
    }

    useEffect(() => {
        init();
        initDependencias();
    }, [])

    if (tamanhos?.length === 0) {
        return (<></>)
    }

    return (
        <Box>
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
                        <FormGroup>
                            <FormControlLabel
                                disabled={props.action === 'view'}
                                control={
                                    <Checkbox
                                        name='ativaEcommerce'
                                        id='ativaEcommerce'
                                        checked={formik.values.ativaEcommerce}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                    />
                                }
                                label="Ativa no e-commerce" />
                        </FormGroup>
                    </Grid>
                </Grid>
                {props.action !== 'view' &&
                    <Button
                        variant="contained"
                        sx={{
                            margin: [5, 0, 5]
                        }}
                        onClick={() => setOpen(true)}
                    >
                        Adicionar novo produto
                    </Button>
                }
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
                        },
                        {
                            flex: 0.175,
                            minWidth: 140,
                            field: 'action',
                            headerName: 'Ações',
                            renderCell: (params: GridRenderCellParams) => {
                                return (
                                    <Tooltip title="Excluir" placement="top">
                                        <IconButton
                                            onClick={() => excluir(params.row.id)}
                                        >
                                            <IconifyIcon
                                                icon='ph:trash'
                                            />
                                        </IconButton>
                                    </Tooltip>
                                )
                            }
                        },
                    ]}
                    autoHeight
                    initialState={{
                        pagination: { paginationModel: { pageSize: 5 } },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                />
            </Form>
            <ModalWithChildren
                close={() => {
                    setOpen(false)
                    setItem(undefined)
                }}
                confimerd={addItemTabelaDePreco}
                open={open}
            >
                <Box marginBottom={5}>
                    <Typography variant='h3' sx={{ fontWeight: 700, marginBottom: 5 }}>
                        Adicionar novo produto a tabela de preço!
                    </Typography>
                    <SelectCustom
                        id='produtos'
                        getOptionLabel={option => option.descricao || ''}
                        onInputChange={(event, newInputValue) => {
                            const produto = produtos.find((x) => x.descricao === newInputValue)
                            if (produto) {
                                setItem({
                                    ...item,
                                    produtoId: produto.id,
                                    produto
                                } as IItensTabelaDePreco)
                            }
                        }}
                        options={produtos}
                        renderInput={params =>
                            <CustomTextField
                                {...params}
                                label='Selecione um produto'
                                required
                            />
                        }
                        readOnly={props.action === 'view'}
                    />
                    <SelectCustom
                        id='pesos'
                        getOptionLabel={option => option.descricao || ''}
                        onInputChange={(event, newInputValue) => {
                            const peso = pesos.find((x) => x.descricao === newInputValue)
                            if (peso) {
                                setItem({
                                    ...item,
                                    pesoId: peso.id,
                                    peso
                                } as IItensTabelaDePreco)
                            }
                        }}
                        options={pesos}
                        renderInput={params =>
                            <CustomTextField
                                {...params}
                                label='Selecione um peso'
                                required
                            />
                        }
                        readOnly={props.action === 'view'}
                    />
                    <SelectCustom
                        id='tamanhos'
                        getOptionLabel={option => option.descricao || ''}
                        onInputChange={(event, newInputValue) => {
                            const tamanho = tamanhos.find((x) => x.descricao === newInputValue);
                            if (tamanho) {
                                setItem({
                                    ...item,
                                    tamanhoId: tamanho.id,
                                    tamanho
                                } as IItensTabelaDePreco)
                            }
                        }}
                        options={tamanhos}
                        renderInput={params =>
                            <CustomTextField
                                {...params}
                                label='Selecione um tamanho'
                                required
                            />
                        }
                        readOnly={props.action === 'view'}
                    />
                    <CustomTextField
                        fullWidth
                        label='Vlr unitário atacado'
                        name='valorUnitarioAtacado'
                        id='valorUnitarioAtacado'
                        value={item?.valorUnitarioAtacado ?? 0}
                        onChange={(e) => {
                            setItem({
                                ...item,
                                valorUnitarioAtacado: parseFloat(e.target.value)
                            } as IItensTabelaDePreco)
                        }}
                        type="number"
                        InputProps={{
                            readOnly: props.action === 'view'
                        }}
                    />
                    <CustomTextField
                        fullWidth
                        label='Vlr unitário varejo'
                        name='valorUnitarioVarejo'
                        id='valorUnitarioVarejo'
                        value={item?.valorUnitarioVarejo ?? 0}
                        onChange={(e) => {
                            setItem({
                                ...item,
                                valorUnitarioVarejo: parseFloat(e.target.value)
                            } as IItensTabelaDePreco)
                        }}
                        type="number"
                        InputProps={{
                            readOnly: props.action === 'view'
                        }}
                    />
                </Box>
            </ModalWithChildren>
        </Box>
    )
}