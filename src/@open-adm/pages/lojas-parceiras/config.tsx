import { Box, Typography } from "@mui/material"
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import { ILojasParceiras } from "src/@open-adm/types/lojas-parceiras";
import { maskPhone } from "src/@open-adm/utils/mask";
import * as yup from 'yup'


export const columns: GridColDef[] = [
    {
        flex: 0.200,
        minWidth: 200,
        field: 'foto',
        headerName: 'Foto',
        renderCell: (params: GridRenderCellParams) => (
            <Box
                component="img"
                src={params.row.foto}
                sx={{ width: '100px', height: '50px', borderRadius: '5px' }}
            />
        )
    },
    {
        flex: 0.200,
        minWidth: 200,
        field: 'nome',
        headerName: 'Nome'
    },
    {
        flex: 0.200,
        minWidth: 200,
        field: 'contato',
        headerName: 'Contato',
        renderCell: (params: GridRenderCellParams) => (
            <Typography>
                {maskPhone(params.row.contato)}
            </Typography>
        )
    }
];

export const defaultValues : ILojasParceiras = {
    nome: "",
    id: "",
    dataDeCriacao: "",
    dataDeAtualizacao: "",
    numero: 0
}

export const schema = yup.object().shape({
    nome: yup
        .string()
        .max(255, "Campo máximo exedido!")
        .required("Informe o nome da loja!")
})