"use client"

import { Pagination } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useApiUltimoPedidoUsuario } from "src/@open-adm/api/use-api-ultimo-pedido-usuario"
import { BoxApp } from "src/@open-adm/components/box";
import { StatusApp } from "src/@open-adm/components/chip";
import { DividerApp } from "src/@open-adm/components/divider";
import { FormRoot } from "src/@open-adm/components/form/form-root";
import { IconButtonAppComTooltip } from "src/@open-adm/components/icon/icon-button-app-tool-tip";
import { LoadingAppTexto } from "src/@open-adm/components/loading/loading-app-texto";
import { TableApp } from "src/@open-adm/components/table/table-app";
import { TextApp } from "src/@open-adm/components/text";
import { statusPedido } from "src/@open-adm/enuns/status-pedido";
import { useNavigateApp } from "src/@open-adm/hooks/use-navigate-app";
import { IPaginacaoUltimoPedidoUsuario, IUltimoPedidoUsuario } from "src/@open-adm/types/ultimo-pedido-usuario";
import { formatDate } from "src/@open-adm/utils/convert-date";
import { formatMoney } from "src/@open-adm/utils/format-money";
import { maskCNPJ, maskCPF, maskPhone } from "src/@open-adm/utils/mask";
import { listaIcones } from "src/configs/listaIcones";

interface PropsUltimosPedidos {
    isJuridico: boolean
}

const backGroudSemPedido = '#f9d8d8';
const backGroudComPedido = '#c3f9c3';

export function UltimosPedidos(props: PropsUltimosPedidos) {
    const [page, setPage] = useState(1);
    const [paginacao, setPaginacao] = useState<IPaginacaoUltimoPedidoUsuario>();
    const { listar } = useApiUltimoPedidoUsuario();
    const { navigate } = useNavigateApp();

    async function init() {
        const response = await listar.fetch(page, props.isJuridico);
        if (response) {
            setPaginacao(response)
        }
    }

    const handleChangePagination = async (
        _: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value);
        const response = await listar.fetch(value, props.isJuridico);
        if (response) {
            setPaginacao(response)
        }
    };

    useEffect(() => {
        init();
    }, [])

    const titulo = props.isJuridico ? "Ultimos pedidos clientes CNPJ" : "Ultimos pedidos clientes CPF";

    return (
        <FormRoot.Form readonly submit={async () => console.log('')} titulo={titulo}>
            {listar.status === 'loading' && (
                <LoadingAppTexto comBox />
            )}
            <BoxApp display="flex" alignItems="center" gap="1rem">
                <BoxApp display="flex" alignItems="center" gap="1rem">
                    <BoxApp width="30px" height="30px" borderRadius="5px" backgroundColor={backGroudComPedido}>
                        <></>
                    </BoxApp>
                    <TextApp texto="Cliente com pedido" />
                </BoxApp>
                <BoxApp display="flex" alignItems="center" gap="1rem">
                    <BoxApp width="30px" height="30px" borderRadius="5px" backgroundColor={backGroudSemPedido}>
                        <></>
                    </BoxApp>
                    <TextApp texto="Cliente sem pedido" />
                </BoxApp>
            </BoxApp>
            <DividerApp marginTop="1rem" />
            <TableApp
                getBackgroundColor={(row: IUltimoPedidoUsuario) => {
                    if (!row.numeroDoPedido) {
                        return backGroudSemPedido;
                    }
                    return backGroudComPedido;
                }}
                columns={[
                    {
                        field: "wpp",
                        headerName: "whatsApp",
                        renderCell: (row: IUltimoPedidoUsuario) => {
                            return (
                                <>
                                    <Link href={`https://api.whatsapp.com/send?phone=55${row.telefone}`} target="_blank">
                                        <IconButtonAppComTooltip
                                            icon={listaIcones.whatsApp}
                                            titulo={''}
                                            onClick={() => navigate()}
                                        />
                                    </Link>
                                </>
                            )
                        }
                    },
                    {
                        field: "nome",
                        headerName: "Nome"
                    },
                    {
                        field: "cpfCnpj",
                        headerName: "CPF/CNPJ",
                        renderCell: (row: IUltimoPedidoUsuario) => props.isJuridico ? maskCNPJ(row.cpfCnpj) : maskCPF(row.cpfCnpj)
                    },
                    {
                        field: "telefone",
                        headerName: "Telefone",
                        renderCell: (row: IUltimoPedidoUsuario) => maskPhone(row.telefone)
                    },
                    {
                        field: "status",
                        headerName: "Status",
                        renderCell: (params: IUltimoPedidoUsuario) => {
                            if (params.statusPedido === 0) {
                                const status = statusPedido[params.statusPedido]

                                return (
                                    <StatusApp
                                        cor={status.color}
                                        titulo={status.title}
                                    />
                                )
                            };
                            if (!params.statusPedido) {

                                return "";
                            }
                            const status = statusPedido[params.statusPedido]

                            return (
                                <StatusApp
                                    cor={status.color}
                                    titulo={status.title}
                                />
                            )
                        }
                    },
                    {
                        field: "dataUltimoPedido",
                        headerName: "DT pedido",
                        renderCell: (row: IUltimoPedidoUsuario) => formatDate(row.dataDoUltimoPedido) ?? ''
                    },
                    {
                        field: "total",
                        headerName: "Total",
                        renderCell: (row: IUltimoPedidoUsuario) => !row.total ? "" : formatMoney(row.total) ?? ''
                    },
                    {
                        field: "numeroDoPedido",
                        headerName: "Numero",
                        renderCell: (row: IUltimoPedidoUsuario) => !row.numeroDoPedido ? "" : row.numeroDoPedido
                    },
                ]}
                rows={paginacao?.dados ?? []}
                minWidth={1600}
            />
            <BoxApp display="flex" alignItems="center" justifyContent="end">
                <Pagination
                    count={paginacao?.totalPagina}
                    page={page}
                    onChange={handleChangePagination}
                    variant='outlined'
                    shape='rounded'
                    color='primary'
                />
            </BoxApp>
        </FormRoot.Form>
    )
}