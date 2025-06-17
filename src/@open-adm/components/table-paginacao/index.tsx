import { ReactNode, useEffect, useState } from 'react';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { TypeMethod, useNewApi } from 'src/@open-adm/hooks/use-new-api';
import { ISortingTable, TablePaginacao } from './table';
import { BoxApp } from '../box';
import { FooterTable } from './footer';
import { HeaderTable } from './header';
import { Card, CircularProgress, Divider, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import IconifyIcon from 'src/@core/components/icon';
import { useApi } from 'src/@open-adm/hooks/use-api';
import { useModal } from '../modal/modal';
import { useNavigateApp } from 'src/@open-adm/hooks/use-navigate-app';
import { formatDate } from 'src/@open-adm/utils/convert-date';

interface tableProps {
    columns: any[];
    url: string;
    checkboxSelection?: boolean;
    urlDelete?: string;
    urlAdd?: string;
    urlView?: string;
    urlEdit?: string;
    notShowHeader?: boolean;
    notBtnAdd?: boolean;
    initialField?: string;
    refreshPai?: any;
    filtroComplementar?: any;
    nomeColunaAcoes?: string;
    desabilitarColunaAcoes?: boolean;
    metodo?: TypeMethod;
    childrenHeader?: ReactNode;
    minWidth?: number;
}

export function TableIndex(props: tableProps) {
    const { getItem } = useLocalStorage();
    const { deleteApi } = useApi();
    const { navigate } = useNavigateApp();
    const modal = useModal();
    const [totalDeRegistros, setTotalDeRegistros] = useState<number>(0);
    const [pagina, setPagina] = useState<number>(1);
    const [loading, setLoading] = useState(true);
    const [quantidadePorPagina, setQuantidadePorPagina] = useState<number>(
        parseInt(getItem<string>('quantidade-por-pagina') ?? '5'),
    );
    const [sorting, setSorting] = useState<ISortingTable>({
        field: 'numero',
        sort: 'desc',
    });
    const [quantidadePagina, setQuantidadePagina] = useState<number>(0);
    const [rows, setRows] = useState<any[]>([]);
    const { fecth } = useNewApi({
        method: props.metodo ?? 'POST',
        url: props.url,
        naoRenderizarResposta: true
    });

    const body = {
        skip: pagina,
        take:
            typeof quantidadePorPagina === 'string'
                ? parseInt(quantidadePorPagina)
                : quantidadePorPagina,
        orderBy: sorting.field,
        asc: sorting.sort === 'asc',
        ...props.filtroComplementar,
    };

    async function refresh(searchP?: string) {
        setLoading(true);
        const response = await fecth<any>({
            body: { ...body, search: searchP },
        });
        if (response?.values?.length > 0) {
            setRows(response.values);
            setTotalDeRegistros(response.totalDeRegistros);
            setQuantidadePagina(response.totalPaginas);
        } else {
            if (rows?.length > 0) {
                setRows([]);
            }
        }
        setLoading(false);
    }

    function excluir(id: string) {
        try {
            modal.show({
                async confirmed() {
                    modal.close();
                    await deleteApi(`${props.urlDelete}?id=${id}`)
                    await refresh();
                },
            })
        } catch (error) {

        }
    }

    function optionsColumns(): GridColDef<any>[] {
        return [
            {
                width: 200,
                field: 'dataDeCriacao',
                headerName: 'Cadastro',
                renderCell: (params: any) => formatDate(params?.dataDeCriacao),
                sortable: true,
            },
            {
                width: 200,
                field: 'action',
                headerName: 'Ações',
                renderCell: (params: any) => {
                    return (
                        <>
                            {props.urlView &&
                                <Tooltip title="Visualizar" placement="top">
                                    <IconButton
                                        onClick={() => navigate(`${props.urlView}/${params.id}`)}
                                    >
                                        <IconifyIcon
                                            icon='tabler:eye'
                                        />
                                    </IconButton>
                                </Tooltip>
                            }
                            {props.urlEdit &&
                                <Tooltip title="Editar" placement="top">
                                    <IconButton
                                        onClick={() => navigate(`${props.urlEdit}/${params.id}`)}
                                    >
                                        <IconifyIcon
                                            icon='ep:edit'
                                        />
                                    </IconButton>
                                </Tooltip>
                            }
                            {props.urlDelete &&
                                <Tooltip title="Excluir" placement="top">
                                    <IconButton
                                        onClick={() => excluir(params.id)}
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
                headerName: 'N°',
                width: 80,
                renderCell: (params: any) => (
                    <Typography variant='body2' sx={{ color: 'success' }}>
                        #{params.numero}
                    </Typography>
                ),
                sortable: true,
            },
        )

        return columns;
    }

    useEffect(() => {
        refresh();
    }, [
        pagina,
        quantidadePorPagina,
        sorting,
        props.refreshPai,
    ]);

    return (
        <Card
            sx={{
                height: '100%',
                padding: '10px',
                overflowY: 'auto'
            }}
        >
            {props.childrenHeader &&
                <>{props.childrenHeader}</>
            }
            {!props.notShowHeader && (
                <HeaderTable
                    urlAdd={props.urlAdd}
                    notBtnAdd={props.notBtnAdd}
                    pesquisar={refresh}
                />
            )}
            <BoxApp
                maxHeight='calc(100% - 120px)'
                height='100%'
                overflowy='auto'
                width='100%'
            >
                {loading ? (
                    <BoxApp
                        display='flex'
                        width='100%'
                        justifyContent='center'
                        gap='20px'
                    >
                        <Typography>Carregando ... </Typography>
                        <CircularProgress size={20} />
                    </BoxApp>
                ) : (
                    <TablePaginacao
                        columns={[...defaultColuns(), ...props.columns, ...optionsColumns()]}
                        rows={rows}
                        sorting={sorting}
                        setSorting={setSorting}
                        minWidth={props.minWidth}
                    />
                )}
            </BoxApp>
            <Divider sx={{
                width: '100%',
                marginBottom: '30px'
            }} />
            <FooterTable
                quantidadePorPagina={quantidadePorPagina}
                setQuantidadePorPagina={setQuantidadePorPagina}
                pagina={pagina}
                setPagina={setPagina}
                quantidadePagina={quantidadePagina}
                length={rows.length}
                totalDeRegistros={totalDeRegistros}
            />
        </Card>
    );
}