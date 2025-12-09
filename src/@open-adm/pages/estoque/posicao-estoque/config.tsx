import { GridColDef } from "@mui/x-data-grid";
import { StatusObj } from "../../pedidos/config";
import CustomChip from 'src/@open-adm/components/chip'
import { IEstoqueEdit } from "src/@open-adm/types/estoque";
import * as yup from 'yup';
import { formatDateComHoras } from "src/@open-adm/utils/convert-date";
import { TypeColumns } from "src/@open-adm/components/table/tabela-com-drag";

export const quantidade: StatusObj = {
    0: { title: 'Em aberto', color: 'warning' },
    1: { title: 'Entregue', color: 'success' },
}

export const columns: TypeColumns[] = [
    {
        width: 200,
        field: 'produto',
        headerName: 'Produto'
    },
    {
        width: 100,
        field: 'peso',
        headerName: 'Peso',
    },
    {
        width: 100,
        field: 'tamanho',
        headerName: 'Tamanho',
    },
    {
        width: 200,
        field: 'quantidade',
        headerName: 'Posição do estoque',
        cellRenderer: (params: { data: any }) => {
            const status = quantidade[params.data.quantidade > 0 ? 1 : 0]
            return (
                <CustomChip
                    rounded
                    size='small'
                    skin='light'
                    color={status.color}
                    label={params.data.quantidade}
                    sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
                />
            )
        }
    },
    {
        width: 200,
        field: 'quantidadeDisponivel',
        headerName: 'Qtd. disponível',
        cellRenderer: (params: { data: any }) => {
            const status = quantidade[params.data.quantidadeDisponivel > 0 ? 1 : 0]
            return (
                <CustomChip
                    rounded
                    size='small'
                    skin='light'
                    color={status.color}
                    label={params.data.quantidadeDisponivel}
                    sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
                />
            )
        }
    },
    {
        width: 200,
        field: 'quantidadeReservada',
        headerName: 'Qtd. reservada',
        cellRenderer: (params: { data: any }) => {
            const status = quantidade[params.data.quantidadeReservada > 0 ? 1 : 0]
            return (
                <CustomChip
                    rounded
                    size='small'
                    skin='light'
                    color={status.color}
                    label={params.data.quantidadeReservada}
                    sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
                />
            )
        }
    },
    {
        width: 140,
        field: 'dataDeAtualizacao',
        headerName: 'Ultima movimentação',
        cellRenderer: (params: { data: any }) => {
            return formatDateComHoras(params.data.dataDeAtualizacao);
        }
    }
]

export const defaultValues: IEstoqueEdit = {
    produtoId: "",
    quantidade: 0
}

export const schema = yup.object().shape({
    produtoId: yup
        .string()
        .required("Informe o produto!"),
})