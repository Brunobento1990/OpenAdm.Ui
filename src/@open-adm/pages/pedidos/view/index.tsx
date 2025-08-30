"use client"

import { useEffect, useState } from "react";
import { useApiPedido } from "src/@open-adm/api/UseApiPedido";
import { FormApp } from "src/@open-adm/components/form";
import { FormRoot } from "src/@open-adm/components/form/form-root";
import { InputApp } from "src/@open-adm/components/input/input-app";
import { LoadingAppTexto } from "src/@open-adm/components/loading/loading-app-texto";
import { useNavigateApp } from "src/@open-adm/hooks/use-navigate-app";
import { IItemPedido, IPedido } from "src/@open-adm/types/pedido";
import { formatDateComHoras } from "src/@open-adm/utils/convert-date";
import { statusPedido } from "../config";
import { TableApp } from "src/@open-adm/components/table/table-app";
import { DividerApp } from "src/@open-adm/components/divider";
import { he } from "date-fns/locale";
import { render } from "nprogress";
import { formatMoney } from "src/@open-adm/utils/format-money";
import { Chip } from "@mui/material";

export function PedidoView() {
    const { obter } = useApiPedido();
    const { navigate, id } = useNavigateApp();
    const [pedido, setPedido] = useState<IPedido>();

    async function load() {
        const response = await obter.fetch(id as string);
        setPedido(response);
    }

    const status = statusPedido[pedido?.statusPedido ?? 0]

    useEffect(() => {
        load();
    }, [])

    return (
        <FormApp urlVoltar="/pedidos" readonly titulo={`Pedido ${pedido?.numero ?? ''}`} submit={async () => console.log('')}>
            {obter.status === 'loading' && <LoadingAppTexto comBox />}
            <FormRoot.FormRow spacing={3}>
                <FormRoot.FormItemRow xs={12} sm={3}>
                    <InputApp label="Data de cadastro" value={formatDateComHoras(pedido?.dataDeCriacao) ?? ''} />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow xs={12} sm={6}>
                    <InputApp label="Cliente" value={pedido?.usuario ?? ''} />
                </FormRoot.FormItemRow>
                <FormRoot.FormItemRow xs={12} sm={3}>
                    <InputApp label="Status" value={status.title ?? ''} />
                </FormRoot.FormItemRow>
            </FormRoot.FormRow>
            <DividerApp chip="Itens" color="primary" marginBotton="1rem" />
            <TableApp
                stickyHeader
                columns={[
                    {
                        field: "estoque",
                        headerName: "Estoque",
                        renderCell: (item: IItemPedido) => {
                            const cor = item.estoqueDisponivel >= item.quantidade ? 'success' : 'error';
                            return <Chip label={`${item.estoqueDisponivel}`} color={cor} />;
                        }
                    },
                    {
                        field: "produto", headerName: "Produto", renderCell: (item: IItemPedido) => item.produto?.descricao
                    },
                    {
                        field: "pedo", headerName: "Peso/Tamanho", renderCell: (item: IItemPedido) => item.peso ? `${item.peso.descricao}` : item.tamanho ? `${item.tamanho.descricao}` : ''
                    },
                    { field: "quantidade", headerName: "Quantidade" },
                    { field: "valorUnitario", headerName: "Vlr", renderCell: (item: IItemPedido) => formatMoney(item.valorUnitario) }
                ]}
                rows={pedido?.itensPedido ?? []}
            />
        </FormApp>
    );
}