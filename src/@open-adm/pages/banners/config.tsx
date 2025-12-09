import { Box, Checkbox } from "@mui/material"
import { TypeColumns } from "src/@open-adm/components/table/tabela-com-drag"

export function useConfig() {

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
            ),
            sortable: true,
        },
        {
            width: 200,
            field: 'ativo',
            headerName: 'Ativo',
            cellRenderer: (params: { data: any }) => (
                <Checkbox checked={params.data.ativo} />
            ),
            sortable: true,
        }
    ]

    return {
        columns
    }
}