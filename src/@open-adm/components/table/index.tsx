import { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useApi } from 'src/@open-adm/hooks/use-api';
import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Pagination, Radio, RadioGroup, Skeleton, Tooltip, Typography } from '@mui/material';
import { ModalWithChildren } from '../modal';
import IconifyIcon from 'src/@core/components/icon';
import { Controller, useForm } from 'react-hook-form';
import CustomTextField from 'src/@core/components/mui/text-field';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { useModal } from '../modal/modal';
import { useRouter } from 'next/router';

const defaultValues = {
    search: ''
}

const schema = yup.object().shape({
    search: yup.string().required("Informe a pesquisa")
})

interface tableProps {
    columns: GridColDef[];
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
}

const Table = (props: tableProps) => {


    const { get, put, deleteApi } = useApi();
    const router = useRouter();
    const modal = useModal();
    const [rows, setRows] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [statusPedido, setStatusPedido] = useState<string>('0');
    const [statusPedidoFiltro, setStatusPedidoFiltro] = useState<string>('0');
    const [pedido, setPedido] = useState<any>();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChangePagination = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value);
    };

    async function updateStatus() {
        try {
            setLoading(true);
            setOpen(false);
            const response = await put('pedidos/update-status', {
                pedidoId: pedido?.id,
                statusPedido: parseInt(statusPedido)
            })

            if (response) {
                await init();
            }
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    async function init() {
        try {
            setLoading(true)
            const response: any = await get(`${props.url}?skip=${page - 1}${statusPedidoFiltro !== '0' && props.isPedido ? `&statusPedido=${parseInt(statusPedidoFiltro) - 1}` : ''}&search=${getValues('search')}`);
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

    function optionsColumns(): GridColDef<any>[] {
        return [
            {
                flex: 0.175,
                minWidth: 140,
                field: 'dataDeCriacao',
                headerName: 'Data de cadastro',
                valueGetter: (params: any) => {
                    const newValue = params?.row?.dataDeCriacao?.slice(0, 10).split('-')
                    return `${newValue[2]}/${newValue[1]}/${newValue[0]}`
                }
            },
            {
                flex: 0.175,
                minWidth: 140,
                field: 'action',
                headerName: 'Ações',
                renderCell: (params: GridRenderCellParams) => {
                    return (
                        <>
                            {props.isPedido &&
                                <Tooltip title="Modificar status do pedido" placement="top">
                                    <IconButton
                                        onClick={() => {
                                            setOpen(true);
                                            setPedido(params.row);
                                            setStatusPedido(params.row.statusPedido)
                                        }}
                                    >
                                        <IconifyIcon
                                            icon='fe:app-menu'
                                        />
                                    </IconButton>
                                </Tooltip>
                            }
                            {props.view && props.routeView &&
                                <Tooltip title="Visualizar" placement="top">
                                    <IconButton
                                        onClick={() => router.replace(`${props.routeView}/${params.row.id}`)}
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
                                        onClick={() => router.replace(`${props.routeEdit}/${params.row.id}`)}
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
                                        onClick={() => excluir(params.row.id)}
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

    function defaultColuns(): GridColDef<any>[] {
        let columns: GridColDef<any>[] = [];

        columns.push(
            {
                field: 'numero',
                headerName: 'Número',
                flex: 0.100,
                minWidth: 80,
                renderCell: (params: GridRenderCellParams) => (
                    <Typography variant='body2' sx={{ color: 'success' }}>
                        #{params.row.numero}
                    </Typography>
                )
            },
        )

        return columns;
    }

    const onSubmit = async () => {
        await init()
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
                <DataGrid
                    autoHeight
                    rows={rows}
                    columns={[...defaultColuns(), ...props.columns, ...optionsColumns()]}
                    checkboxSelection={props.checkboxSelection}
                    hideFooterPagination
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
            {props.isPedido &&
                <ModalWithChildren
                    close={() => setOpen(false)}
                    confimerd={updateStatus}
                    open={open}
                >
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <Box sx={{ mb: 4, textAlign: 'center' }}>
                                <Typography variant='h3' sx={{ mb: 3 }}>
                                    Selecione o status do pedido!
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ mb: 4, textAlign: 'center' }}>
                                <Typography variant='h4' sx={{ mb: 3 }}>
                                    #{pedido?.numero}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl>
                                <FormLabel component='legend'>Status</FormLabel>
                                <RadioGroup aria-label='status' name='status' row value={statusPedido} onChange={(e) => setStatusPedido(e.target.value)}>
                                    <FormControlLabel value='0' control={<Radio />} label='Em aberto' />
                                    <FormControlLabel value='1' control={<Radio />} label='Faturado' />
                                    <FormControlLabel value='2' control={<Radio />} label='Em entrega' />
                                    <FormControlLabel value='3' control={<Radio />} label='Entregue' />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </ModalWithChildren>
            }
        </>
    )
}

export default Table
