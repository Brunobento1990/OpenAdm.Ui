import { Box, Checkbox, IconButton, Tooltip } from "@mui/material"
import IconifyIcon from "src/@core/components/icon";
import { TypeColumns } from "src/@open-adm/components/table/tabela-com-drag";
import * as yup from 'yup';

interface propsColunsCategoria {
    inativarEcommerce: (id: string, inativo: boolean) => void;
}

export function colunsCategoria(props: propsColunsCategoria) {
    const columns: TypeColumns[] = [
        {
            width: 200,
            field: 'foto',
            headerName: 'Foto',
            cellRenderer: (params: { data: any }) => (
                <Box
                    component="img"
                    src={params.data.foto}
                    sx={{ width: '100px', height: '50px', borderRadius: '5px' }}
                />
            )
        },
        {
            width: 200,
            field: 'descricao',
            headerName: 'Descricao',
            sortable: true,
        },
        {
            width: 200,
            field: 'inativoEcommerce',
            headerName: 'Inativo',
            cellRenderer: (params: { data: any }) => <Checkbox disabled checked={params.data.inativoEcommerce} />
        },
        {
            width: 200,
            field: 'inativar',
            headerName: 'Inativar',
            cellRenderer: (params: { data: any }) => (
                <Tooltip title="Inativar/Ativar" placement="top">
                    <IconButton
                        onClick={() => props.inativarEcommerce(params.data.id, params.data.inativoEcommerce ?? false)}
                    >
                        <IconifyIcon
                            icon='tabler:refresh'
                        />
                    </IconButton>
                </Tooltip>
            )
        },
    ]

    return {
        columns
    }
}

export const defaultValues = {
    descricao: ''
}

export const schema = yup.object().shape({
    descricao: yup
        .string()
        .max(255, "Campo máximo exedido!")
        .required("Informe a descrição!")
})
