import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import { StatusObj } from "../../pedidos/config"
import CustomChip from 'src/@open-adm/components/chip'
import { IMovimentacaoDeProduto } from "src/@open-adm/types/estoque"
import * as yup from 'yup'
import { TypeColumns } from "src/@open-adm/components/table/tabela-com-drag"

export const tipoMovimentacaoDeProduto: StatusObj = {
    0: { title: 'Entrada', color: 'info' },
    1: { title: 'Saída', color: 'success' },
}

export const columns: TypeColumns[] = [
    {
        width: 200,
        field: 'produto',
        headerName: 'Produto'
    },
    {
        width: 200,
        field: 'peso',
        headerName: 'Peso',
    },
    {
        width: 200,
        field: 'tamanho',
        headerName: 'Tamanho',
    },
    {
        width: 200,
        field: 'quantidadeMovimentada',
        headerName: 'Quantidade movimentadao',
        sortable: true,
    },
    {
        width: 200,
        field: 'tipoMovimentacaoDeProduto',
        headerName: 'Tipo Movimentação',
        cellRenderer: (params: { data: any }) => {
            const status = tipoMovimentacaoDeProduto[params.data.tipoMovimentacaoDeProduto]

            return (
                <CustomChip
                    rounded
                    size='small'
                    skin='light'
                    color={status.color}
                    label={status.title}
                    sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
                />
            )
        }
    },
]

export const defaultValues: IMovimentacaoDeProduto = {
    produtoId: "",
    quantidade: 0,
    tipoMovimentacaoDeProduto: 0
}

export const schema = yup.object().shape({
    produtoId: yup
        .string()
        .required("Informe o produto!"),
    quantidade: yup
        .number()
        .min(0, 'Informe a quantidade!')
})
