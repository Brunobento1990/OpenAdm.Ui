import { Box, Checkbox, IconButton, Tooltip } from "@mui/material"
import { GridColDef } from "@mui/x-data-grid"
import IconifyIcon from "src/@core/components/icon";
import * as yup from 'yup';

interface propsColunsCategoria {
    inativarEcommerce: (id: string, inativo: boolean) => void;
}

export function colunsCategoria(props: propsColunsCategoria) {
    const columns: GridColDef[] = [
        {
            flex: 0.200,
            minWidth: 200,
            field: 'foto',
            headerName: 'Foto',
            renderCell: (params: any) => (
                <Box
                    component="img"
                    src={params.foto}
                    sx={{ width: '100px', height: '50px', borderRadius: '5px' }}
                />
            )
        },
        {
            flex: 0.200,
            minWidth: 200,
            field: 'descricao',
            headerName: 'Descricao',
            sortable: true,
        },
        {
            flex: 0.200,
            minWidth: 200,
            field: 'inativoEcommerce',
            headerName: 'Inativo',
            renderCell: (params: any) => <Checkbox disabled checked={params.inativoEcommerce} />
        },
        {
            flex: 0.200,
            minWidth: 200,
            field: 'inativar',
            headerName: 'Inativar',
            renderCell: (params: any) => (
                <Tooltip title="Inativar/Ativar" placement="top">
                    <IconButton
                        onClick={() => props.inativarEcommerce(params.id, params.inativoEcommerce ?? false)}
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
