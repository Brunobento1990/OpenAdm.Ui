import { IconButton } from "@mui/material";
import IconifyIcon from "src/@core/components/icon";
import { YupAdapter } from "src/@open-adm/adapters/yup-adapter";
import { IItemPedidoCreate, IPedidoCreate } from "src/@open-adm/types/pedido";
import { formatMoney } from "src/@open-adm/utils/format-money";
import { listaIcones } from "src/configs/listaIcones";

export const initialValues: IPedidoCreate = {
    usuarioId: "",
    usuario: undefined!,
    itens: [],
    tabelaDePrecoId: "",
    tabelaDePreco: undefined!
}

export const schema = new YupAdapter()
    .string('usuarioId')
    .string('tabelaDePrecoId', 'Selecione a tabela de preço')
    .build();

interface propsConfig {
    remove: (index: number) => void;
}

export function config(props: propsConfig) {
    const coluns = [
        {
            field: 'descricao',
            headerName: 'Descricao',
            renderCell: (item: IItemPedidoCreate) => item.produto?.descricao
        },
        {
            field: 'peso',
            headerName: 'Peso',
            renderCell: (item: IItemPedidoCreate) => item.peso?.descricao
        },
        {
            field: 'tamanho',
            headerName: 'Tamanho',
            renderCell: (item: IItemPedidoCreate) => item.tamanho?.descricao
        },
        {
            field: 'quantidade',
            headerName: 'Qtd',
            renderCell: (item: IItemPedidoCreate) => item.quantidade
        },
        {
            field: 'valorUnitario',
            headerName: 'Vlr',
            renderCell: (item: IItemPedidoCreate) => formatMoney(item.valorUnitario)
        },
        {
            field: 'excluir',
            headerName: 'Excluir',
            renderCell: (_: any, i: number) => {
                return (
                    <IconButton>
                        <IconifyIcon icon={listaIcones.delete} onClick={() => props.remove(i)} />
                    </IconButton>
                )
            }
        },
    ]

    return {
        coluns
    }
}
