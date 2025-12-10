import { ReactNode, useEffect, useState } from 'react';
import { TypeMethod, useNewApi } from 'src/@open-adm/hooks/use-new-api';
import { ISortingTable } from './table';
import { BoxApp } from '../box';
import { FooterTable } from './footer';
import { HeaderTable } from './header';
import { Card, Divider, IconButton, Tooltip, Typography } from '@mui/material';
import IconifyIcon from 'src/@core/components/icon';
import { useApi } from 'src/@open-adm/hooks/use-api';
import { useModal } from '../modal/modal';
import { useNavigateApp } from 'src/@open-adm/hooks/use-navigate-app';
import { formatDate } from 'src/@open-adm/utils/convert-date';
import { TabelaComDrag, TypeColumns } from '../table/tabela-com-drag';

interface tableProps {
    columns: TypeColumns[];
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
    filtroChildren?: ReactNode;
    take?: number;
    nomeDaTabela?: string;
}

interface IPaginacao {
    pagina: number;
    values: any[];
    quantidadePorPagina: number;
    quantidadePagina: number;
    sorting: ISortingTable;
}

export function TableIndex(props: tableProps) {
    const { deleteApi } = useApi();
    const { navigate } = useNavigateApp();
    const modal = useModal();

    const [paginacao, setPaginacao] = useState<IPaginacao>({
        pagina: 1,
        values: [],
        quantidadePorPagina: Number(localStorage.getItem('paginacao-quantidadePorPagina')) || 10,
        quantidadePagina: 0,
        sorting: {
            field: 'numero',
            sort: 'desc',
        }
    });

    const { fecth, statusRequisicao } = useNewApi({
        method: props.metodo ?? 'POST',
        url: props.url,
        naoRenderizarResposta: true
    });

    const loading = statusRequisicao === 'loading';

    async function refresh(searchP?: string) {
        const response = await fecth<any>({
            body: {
                skip: paginacao.pagina,
                take: props.take ?? paginacao.quantidadePorPagina,
                orderBy: paginacao.sorting.field,
                asc: paginacao.sorting.sort === 'asc',
                search: searchP,
                ...props.filtroComplementar,
            },
        });
        if (response?.values?.length > 0) {
            setPaginacao(state => {
                return {
                    ...state,
                    quantidadePagina: response.totalPaginas,
                    values: response.values
                }
            })
        } else {
            if (paginacao.values?.length > 0) {
                setPaginacao(state => {
                    return {
                        ...state,
                        quantidadePagina: 0,
                        values: []
                    }
                })
            }
        }
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

    function optionsColumns(): TypeColumns[] {
        return [
            {
                width: 200,
                field: 'dataDeCriacao',
                headerName: 'Cadastro',
                cellRenderer: (params: { data: any }) => formatDate(params?.data?.dataDeCriacao),
                sortable: true,
            },
            {
                width: 200,
                field: 'action',
                headerName: 'Ações',
                cellRenderer: (params: { data: any }) => {
                    return (
                        <>
                            {props.urlView &&
                                <Tooltip title="Visualizar" placement="top">
                                    <IconButton
                                        onClick={() => navigate(`${props.urlView}/${params?.data?.id}`)}
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
                                        onClick={() => navigate(`${props.urlEdit}/${params?.data?.id}`)}
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
                                        onClick={() => excluir(params?.data?.id)}
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
                headerName: 'N°',
                width: 80,
                cellRenderer: (params: { data: any }) => (
                    <Typography variant='body2' sx={{ color: 'success' }}>
                        #{params.data.numero}
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
        props.refreshPai,
        paginacao.pagina,
        paginacao.quantidadePorPagina
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
                    filtroChildren={props.filtroChildren}
                    atualizarFiltro={refresh}
                />
            )}
            <BoxApp
                maxHeight='calc(100% - 120px)'
                height='100%'
                overflowy='auto'
                width='100%'
            >
                <TabelaComDrag
                    loading={loading}
                    columns={[...defaultColuns(), ...props.columns, ...optionsColumns()]}
                    rows={paginacao.values}
                    minWidth={props.minWidth}
                    nomeDaTabela={props.nomeDaTabela}
                />
            </BoxApp>
            <FooterTable
                pagina={paginacao.pagina}
                setPagina={(newPage: number) => setPaginacao(state => ({ ...state, pagina: newPage }))}
                quantidadePagina={paginacao.quantidadePagina}
                quantidadePorPagina={paginacao.quantidadePorPagina}
                setQuantidadePorPagina={(qtd) => {
                    localStorage.setItem('paginacao-quantidadePorPagina', qtd.toString());
                    setPaginacao(state => ({ ...state, quantidadePorPagina: qtd }));
                }}
            />
        </Card>
    );
}