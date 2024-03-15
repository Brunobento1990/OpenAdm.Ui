import { Box, Typography } from "@mui/material"
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import { ICreateProdutoDto, IProduto } from "src/@open-adm/types/produto";
import * as yup from 'yup';

export const columns: GridColDef[] = [
    {
        flex: 0.200,
        minWidth: 200,
        field: 'foto',
        headerName: 'Foto',
        renderCell: (params: GridRenderCellParams) => (
            <Box
                component="img"
                loading="lazy"
                src={params.row.foto}
                sx={{ width: '100px', height: '50px', borderRadius: '5px' }}
            />
        )
    },
    {
        flex: 0.200,
        minWidth: 200,
        field: 'descricao',
        headerName: 'Descricao'
    },
    {
        flex: 0.200,
        minWidth: 200,
        field: 'referencia',
        headerName: 'Referencia'
    }
]

export const defaultValues: ICreateProdutoDto = {
    descricao: '',
    foto: "",
    categoriaId: "",
    categoria: {
        descricao: "",
        id: "",
        dataDeCriacao: "",
        dataDeAtualizacao: "",
        numero: 0
    },
    tamanhos: [],
    pesos: [],
    vinculoProdutoTabelaDePreco: {
        tabelaDePrecoId: "",
        itens: []
    }
}

export const defaultValuesEdit: IProduto = {
    descricao: '',
    foto: "",
    categoriaId: "",
    categoria: {
        descricao: "",
        id: "",
        dataDeCriacao: "",
        dataDeAtualizacao: "",
        numero: 0
    },
    tamanhos: [],
    pesos: [],
    id: "",
    dataDeCriacao: "",
    dataDeAtualizacao: "",
    numero: 0
}

export const schema = yup.object().shape({
    descricao: yup
        .string()
        .max(255, "Campo máximo exedido!")
        .required("Informe a descrição!"),
    categoriaId: yup
        .string()
        .required("Informe a categoria!")
})

export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}