import { Box, Typography } from "@mui/material"
import { TypeColumns } from "src/@open-adm/components/table/tabela-com-drag";
import { ILojasParceiras } from "src/@open-adm/types/lojas-parceiras";
import { maskPhone } from "src/@open-adm/utils/mask";
import * as yup from 'yup'


export const columns: TypeColumns[] = [
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
        field: 'nome',
        headerName: 'Nome',
        sortable: true,
    },
    {
        width: 200,
        field: 'contato',
        headerName: 'Contato',
        cellRenderer: (params: { data: any }) => (
            <Typography>
                {maskPhone(params.data.contato)}
            </Typography>
        )
    }
];

export const defaultValues: ILojasParceiras = {
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