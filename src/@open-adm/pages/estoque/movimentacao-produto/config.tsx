import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import { StatusObj } from "../../pedidos/config"
import CustomChip from 'src/@open-adm/components/chip'
import { IMovimentacaoDeProduto } from "src/@open-adm/types/estoque"
import * as yup from 'yup'

export const tipoMovimentacaoDeProduto: StatusObj = {
    0: { title: 'Entrada', color: 'info' },
    1: { title: 'Saída', color: 'success' },
}

export const columns: GridColDef[] = [
    {
        flex: 0.200,
        minWidth: 200,
        field: 'produto',
        headerName: 'Produto'
    },
    {
        flex: 0.200,
        minWidth: 200,
        field: 'quantidadeMovimentada',
        headerName: 'Quantidade movimentadao'
    },
    {
        flex: 0.200,
        minWidth: 200,
        field: 'tipoMovimentacaoDeProduto',
        headerName: 'Tipo Movimentação',
        renderCell: (params: GridRenderCellParams) => {
            const status = tipoMovimentacaoDeProduto[params.row.tipoMovimentacaoDeProduto]

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
