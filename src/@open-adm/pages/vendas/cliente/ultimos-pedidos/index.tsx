"use client"

import { Pagination } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormikAdapter } from "src/@open-adm/adapters/formik-adapter";
import { useApiUltimoPedidoUsuario } from "src/@open-adm/api/use-api-ultimo-pedido-usuario"
import { BoxApp } from "src/@open-adm/components/box";
import { ButtonApp } from "src/@open-adm/components/buttons";
import { StatusApp } from "src/@open-adm/components/chip";
import { DividerApp } from "src/@open-adm/components/divider";
import { FormRoot } from "src/@open-adm/components/form/form-root";
import { IconButtonAppComTooltip } from "src/@open-adm/components/icon/icon-button-app-tool-tip";
import { InputApp } from "src/@open-adm/components/input/input-app";
import { LoadingAppTexto } from "src/@open-adm/components/loading/loading-app-texto";
import { ModalWithChildren } from "src/@open-adm/components/modal";
import { TableApp } from "src/@open-adm/components/table/table-app";
import { TextApp } from "src/@open-adm/components/text";
import { statusPedido } from "src/@open-adm/enuns/status-pedido";
import { useNavigateApp } from "src/@open-adm/hooks/use-navigate-app";
import { IPaginacaoUltimoPedidoUsuario, IPaginacaoUltimoPedidoUsuarioRequest, IUltimoPedidoUsuario } from "src/@open-adm/types/ultimo-pedido-usuario";
import { formatDate, formatDateComHoras } from "src/@open-adm/utils/convert-date";
import { formatMoney } from "src/@open-adm/utils/format-money";
import { maskCNPJ, maskCPF, maskPhone } from "src/@open-adm/utils/mask";
import { listaIcones } from "src/configs/listaIcones";

interface PropsUltimosPedidos {
    isJuridico: boolean
}

const backGroudSemPedido = '#f9d8d8';
const backGroudComPedido = '#c3f9c3';
const width = "165px"

export function UltimosPedidos(props: PropsUltimosPedidos) {
    const [paginacao, setPaginacao] = useState<IPaginacaoUltimoPedidoUsuario>();
    const [ultimoPedidoSelecionado, setUltimoPedidoSelecionado] = useState<IUltimoPedidoUsuario>();
    const { listar } = useApiUltimoPedidoUsuario();
    const { navigate } = useNavigateApp();

    const form = useFormikAdapter<IPaginacaoUltimoPedidoUsuarioRequest>({
        initialValues: {
            page: 1,
            search: "",
            isJuridico: props.isJuridico
        },
        onSubmit: submit
    })

    async function init() {
        const response = await listar.fetch(form.values.page, props.isJuridico);
        if (response) {
            setPaginacao(response)
        }
    }

    const handleChangePagination = async (
        _: React.ChangeEvent<unknown>,
        value: number
    ) => {
        const response = await listar.fetch(value, props.isJuridico);
        if (response) {
            form.setValue({
                page: value
            })
            setPaginacao(response)
        }
    };

    async function submit() {
        const response = await listar.fetch(1, props.isJuridico, form.values.search);
        if (response) {
            setPaginacao(response);
            form.setValue({
                page: 1
            })
        }
    }

    useEffect(() => {
        init();
    }, [])

    const statusPedidoSelecionado = ultimoPedidoSelecionado ? statusPedido[ultimoPedidoSelecionado.statusPedido!] : undefined;
    const titulo = props.isJuridico ? "Ultimos pedidos clientes CNPJ" : "Ultimos pedidos clientes CPF";

    return (
        <FormRoot.Form readonly submit={form.onSubmit} titulo={titulo}>
            {listar.status === 'loading' && (
                <LoadingAppTexto comBox />
            )}
            <ModalWithChildren
                close={() => setUltimoPedidoSelecionado(undefined)}
                open={!!ultimoPedidoSelecionado}
                desabilitarFooter
            >
                <BoxApp display="flex" alignItems="start" flexDirection="column" gap="0.5rem">
                    <BoxApp display="flex" gap="0.5rem">
                        <TextApp width={width} texto={'Cliente:'} fontWeight={600} />
                        <TextApp texto={ultimoPedidoSelecionado?.nome} />
                    </BoxApp>
                    <BoxApp display="flex" gap="0.5rem">
                        <TextApp width={width} texto={'CPF/CNPJ:'} fontWeight={600} />
                        <TextApp texto={ultimoPedidoSelecionado?.cpfCnpj ? maskCNPJ(ultimoPedidoSelecionado.cpfCnpj) : maskCPF(ultimoPedidoSelecionado?.cpfCnpj)} />
                    </BoxApp>
                    <BoxApp display="flex" gap="0.5rem">
                        <TextApp width={width} texto={'Telefone:'} fontWeight={600} />
                        <TextApp texto={maskPhone(ultimoPedidoSelecionado?.telefone)} />
                    </BoxApp>
                    <BoxApp display="flex" gap="0.5rem" alignItems="center">
                        <TextApp texto="Abrir conversa:" fontWeight={600} width={width} />
                        <Link href={`https://api.whatsapp.com/send?phone=55${ultimoPedidoSelecionado?.telefone}`} target="_blank">
                            <IconButtonAppComTooltip
                                icon={listaIcones.whatsApp}
                                titulo={''}
                                onClick={() => navigate()}
                            />
                        </Link>
                    </BoxApp>
                    <BoxApp display="flex" gap="0.5rem">
                        <TextApp width={width} texto={'Data ultimo pedido:'} fontWeight={600} />
                        <TextApp texto={formatDateComHoras(ultimoPedidoSelecionado?.dataDoUltimoPedido)} />
                    </BoxApp>
                    <BoxApp display="flex" gap="0.5rem">
                        <TextApp width={width} texto={'Total ultimo pedido:'} fontWeight={600} />
                        <TextApp texto={formatMoney(ultimoPedidoSelecionado?.total)} />
                    </BoxApp>
                    <BoxApp display="flex" gap="0.5rem">
                        <TextApp width={width} texto={'Número ultimo pedido:'} fontWeight={600} />
                        <TextApp texto={`${ultimoPedidoSelecionado?.numeroDoPedido}`} />
                    </BoxApp>
                    {statusPedidoSelecionado && (
                        <BoxApp display="flex" gap="0.5rem">
                            <TextApp width={width} texto="Status:" fontWeight={600} />
                            <StatusApp
                                cor={statusPedidoSelecionado.color}
                                titulo={statusPedidoSelecionado.title}
                            />
                        </BoxApp>
                    )}
                </BoxApp>
            </ModalWithChildren>
            <BoxApp padding="1rem 0rem 1rem 0rem" display="flex" alignItems="center" gap="1rem">
                <InputApp
                    label="Pesquisar"
                    value={form.values.search}
                    id="search"
                    onChange={form.onChange}
                />
                <BoxApp marginTop="1rem">
                    <ButtonApp onClick={form.onSubmit} type="submit" title="Pesquisar" variant="contained" />
                </BoxApp>
            </BoxApp>
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
                        field: "visualizar",
                        headerName: "Visualizar",
                        renderCell: (row: IUltimoPedidoUsuario) => {
                            return (
                                <>
                                    <IconButtonAppComTooltip
                                        icon={listaIcones.visualizar}
                                        titulo={'Visualizar'}
                                        onClick={() => setUltimoPedidoSelecionado(row)}
                                    />
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
                    page={form.values.page}
                    onChange={handleChangePagination}
                    variant='outlined'
                    shape='rounded'
                    color='primary'
                />
            </BoxApp>
        </FormRoot.Form>
    )
}