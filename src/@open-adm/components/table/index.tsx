import { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useApi } from 'src/@open-adm/hooks/use-api';
import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Pagination, Radio, RadioGroup, Skeleton, Tooltip, Typography } from '@mui/material';
import IconifyIcon from 'src/@core/components/icon';
import { Controller, useForm } from 'react-hook-form';
import CustomTextField from 'src/@core/components/mui/text-field';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { useModal } from '../modal/modal';
import { useRouter } from 'next/router';
import { generatePdfFromBase64 } from 'src/@open-adm/utils/download-pdf';
import { TabelaComDrag, TypeColumns } from './tabela-com-drag';

const defaultValues = {
    search: ''
}

const schema = yup.object().shape({
    search: yup.string().required("Informe a pesquisa")
})

interface tableProps {
    columns: TypeColumns[];
    title: string;
    url: string;
    checkboxSelection?: boolean;
    isPedido?: boolean;
    delete?: boolean;
    routeDelete?: string;
    add?: boolean;
    routeAdd?: string;
    view?: boolean;
    routeView?: string;
    edit?: boolean;
    routeEdit?: string;
    nomeDaTabela?: string;
}

const Table = (props: tableProps) => {
    const { get, deleteApi } = useApi();
    const router = useRouter();
    const modal = useModal();
    const [rows, setRows] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [statusPedidoFiltro, setStatusPedidoFiltro] = useState<string>('0');
    const [loading, setLoading] = useState(false);

    const handleChangePagination = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value);
    };

    async function init() {
        try {
            setLoading(true)
            const response = await get<any>(`${props.url}?skip=${page - 1}${statusPedidoFiltro !== '0' && props.isPedido ? `&statusPedido=${parseInt(statusPedidoFiltro) - 1}` : ''}&search=${getValues('search')}`);
            if (response?.values) {
                setRows(response.values);
                setTotal(response.totalPage)
            }
        } catch (error) {
            setRows([])
            setTotal(0)
        } finally {
            setLoading(false)
        }
    }

    function excluir(id: string) {
        try {
            modal.show({
                async confirmed() {
                    modal.close();
                    await deleteApi(`${props.routeDelete}?id=${id}`)
                    setRows(rows.filter((x) => x.id !== id));
                },
            })
        } catch (error) {

        }
    }

    function optionsColumns(): TypeColumns[] {
        return [
            {
                width: 100,
                field: 'dataDeCriacao',
                headerName: 'Data de cadastro',
                cellRenderer: (params: { data: any }) => {
                    const newValue = params?.data?.dataDeCriacao?.slice(0, 10).split('-')
                    return `${newValue[2]}/${newValue[1]}/${newValue[0]}`
                }
            },
            {
                width: 100,
                field: 'action',
                headerName: 'Ações',
                cellRenderer: (params: { data: any }) => {
                    return (
                        <>
                            {props.isPedido &&
                                <Tooltip title="Download do pedido" placement="top">
                                    <IconButton
                                        onClick={() => downloadPedido(params.data.id)}
                                    >
                                        <IconifyIcon
                                            icon='material-symbols-light:download'
                                        />
                                    </IconButton>
                                </Tooltip>
                            }
                            {props.view && props.routeView &&
                                <Tooltip title="Visualizar" placement="top">
                                    <IconButton
                                        onClick={() => router.replace(`${props.routeView}/${params.data.id}`)}
                                    >
                                        <IconifyIcon
                                            icon='tabler:eye'
                                        />
                                    </IconButton>
                                </Tooltip>
                            }
                            {props.edit && props.routeEdit &&
                                <Tooltip title="Editar" placement="top">
                                    <IconButton
                                        onClick={() => router.replace(`${props.routeEdit}/${params.data.id}`)}
                                    >
                                        <IconifyIcon
                                            icon='ep:edit'
                                        />
                                    </IconButton>
                                </Tooltip>
                            }
                            {props.delete && props.routeDelete &&
                                <Tooltip title="Excluir" placement="top">
                                    <IconButton
                                        onClick={() => excluir(params.data.id)}
                                    >
                                        <IconifyIcon
                                            icon='ph:trash'
                                        />
                                    </IconButton>
                                </Tooltip>
                            }
                        </>

                    )
                }
            },
        ]
    }

    function defaultColuns(): TypeColumns[] {
        let columns: TypeColumns[] = [];

        columns.push(
            {
                field: 'numero',
                headerName: 'Número',
                width: 80,
                cellRenderer: (params: { data: any }) => (
                    <Typography variant='body2' sx={{ color: 'success' }}>
                        #{params.data.numero}
                    </Typography>
                )
            },
        )

        return columns;
    }

    const onSubmit = async () => {
        await init()
    }

    async function downloadPedido(id: string) {
        const pdfBase64 = await get(`pedidos/download-pedido?pedidoId=${id}`) as any;
        if (pdfBase64 && pdfBase64?.pdf) {
            const pdf = await generatePdfFromBase64(pdfBase64.pdf);
            const link = document.createElement('a');
            link.href = pdf;
            link.download = `${id}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    useEffect(() => {
        init();
    }, [page, statusPedidoFiltro])

    const {
        control,
        handleSubmit,
        getValues
    } = useForm({
        defaultValues,
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    return (
        <>
            <Card>
                <CardHeader title={props.title} />
                <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                    <Grid container xs={12} spacing={2} justifyContent="center" sx={{ marginBottom: 5 }}>
                        <Grid item xs={7} md={9} >
                            <Controller
                                name='search'
                                control={control}
                                rules={{ required: true }}
                                render={({ field: { value, onChange, onBlur } }) => (
                                    <CustomTextField
                                        fullWidth
                                        label='Pesquisa'
                                        value={value}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={4} md={2} marginTop={5}>
                            <Button
                                onClick={init}
                                variant='contained'
                            >
                                Pesquisar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                {props.add && props.routeAdd &&
                    <Box width='90%' display='flex' alignItems='center' justifyContent='end' marginBottom={5}>
                        <Button
                            onClick={() => router.replace(props.routeAdd ?? '')}
                            variant='contained'
                            sx={{
                                marginLeft: 5
                            }}
                            endIcon={
                                <IconifyIcon
                                    icon='gala:add'
                                />
                            }
                        >
                            Novo
                        </Button>
                    </Box>
                }
                {props.isPedido &&
                    <Grid item xs={12} sx={{ padding: 5 }}>
                        <FormControl>
                            <FormLabel component='legend'>Filtre por status</FormLabel>
                            <RadioGroup aria-label='status' name='status' row value={statusPedidoFiltro} onChange={(e) => setStatusPedidoFiltro(e.target.value)}>
                                <FormControlLabel value='0' control={<Radio />} label='Todos' />
                                <FormControlLabel value='1' control={<Radio />} label='Em aberto' />
                                <FormControlLabel value='2' control={<Radio />} label='Faturado' />
                                <FormControlLabel value='3' control={<Radio />} label='Em entrega' />
                                <FormControlLabel value='4' control={<Radio />} label='Entregue' />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                }
                <TabelaComDrag
                    rows={rows}
                    columns={[...defaultColuns(), ...props.columns, ...optionsColumns()]}
                />
            </Card>
            <Card
                sx={{
                    marginTop: 5,
                    height: 50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'end',
                }}
            >
                <Pagination
                    count={total}
                    page={page}
                    onChange={handleChangePagination}
                />
            </Card>
        </>
    )
}

export default Table
