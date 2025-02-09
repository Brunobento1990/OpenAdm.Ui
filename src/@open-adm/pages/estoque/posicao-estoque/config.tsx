import { GridColDef } from "@mui/x-data-grid";
import { StatusObj } from "../../pedidos/config";
import CustomChip from 'src/@open-adm/components/chip'
import { IEstoqueEdit } from "src/@open-adm/types/estoque";
import * as yup from 'yup';
import { formatDateComHoras } from "src/@open-adm/utils/convert-date";

export const quantidade: StatusObj = {
    0: { title: 'Em aberto', color: 'warning' },
    1: { title: 'Entregue', color: 'success' },
}

export const columns: GridColDef[] = [
    {
        flex: 0.200,
        minWidth: 200,
        field: 'produto',
        headerName: 'Produto'
    },
    {
        flex: 0.100,
        minWidth: 100,
        field: 'peso',
        headerName: 'Peso',
    },
    {
        flex: 0.100,
        minWidth: 100,
        field: 'tamanho',
        headerName: 'Tamanho',
    },
    {
        flex: 0.200,
        minWidth: 200,
        field: 'quantidade',
        headerName: 'Posição do estoque',
        renderCell: (params: any) => {
            const status = quantidade[params.quantidade > 0 ? 1 : 0]

            return (
                <CustomChip
                    rounded
                    size='small'
                    skin='light'
                    color={status.color}
                    label={params.quantidade}
                    sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
                />
            )
        }
    },
    {
        flex: 0.175,
        minWidth: 140,
        field: 'dataDeAtualizacao',
        headerName: 'Ultima movimentação',
        renderCell: (params: any) => {
            return formatDateComHoras(params.dataDeAtualizacao);
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