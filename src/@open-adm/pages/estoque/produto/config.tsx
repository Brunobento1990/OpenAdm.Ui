import { Box, Checkbox, IconButton, Tooltip } from "@mui/material"
import IconifyIcon from "src/@core/components/icon";
import { TypeColumns } from "src/@open-adm/components/table/tabela-com-drag";
import { ICreateProdutoDto, IProduto } from "src/@open-adm/types/produto";
import { IItensTabelaDePreco, ITabelaDePreco } from "src/@open-adm/types/tabela-de-preco";
import * as yup from 'yup';

interface propsColunsProduto {
    inativarEcommerce: (id: string, inativo: boolean) => void;
}

export function colunsProduto(props: propsColunsProduto) {
    const columns: TypeColumns[] = [
        {
            width: 200,
            field: 'foto',
            headerName: 'Foto',
            cellRenderer: (params: { data: any }) => (
                <Box
                    component="img"
                    loading="lazy"
                    src={params.data.foto}
                    sx={{ width: '200px', height: '50px', borderRadius: '5px' }}
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
            field: 'referencia',
            headerName: 'Referencia'
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
                <Tooltip title="Inativar" placement="top">
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
    pesos: []
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

export interface IHandleItensTabelaDePreco {
    find: (item: IItensTabelaDePreco) => boolean;
    newValue?: string;
    pesoId?: string;
    tamanhoId?: string;
    isVarejo: boolean;
    tabelaDePreco?: ITabelaDePreco;
    produtoId?: string
}

export function handleItensTabelaDePreco(params: IHandleItensTabelaDePreco): ITabelaDePreco | undefined {
    let newItens = params.tabelaDePreco?.itensTabelaDePreco ?? [];
    const newValue = params.newValue ? parseFloat(params.newValue) : undefined;
    const indexOnChange = params.tabelaDePreco?.itensTabelaDePreco?.findIndex(params.find)
    if (indexOnChange === -1) {
        newItens.push({
            produtoId: params.produtoId ?? '',
            tabelaDePrecoId: params?.tabelaDePreco?.id ?? '',
            id: "",
            dataDeCriacao: "",
            dataDeAtualizacao: "",
            numero: 0,
            pesoId: params.pesoId,
            tamanhoId: params.tamanhoId,
            valorUnitarioVarejo: params.isVarejo ? newValue : undefined,
            valorUnitarioAtacado: params.isVarejo ? undefined : newValue
        } as IItensTabelaDePreco)

        return {
            ...params.tabelaDePreco,
            itensTabelaDePreco: newItens
        } as ITabelaDePreco;
    }

    if (indexOnChange !== undefined && indexOnChange >= 0) {

        if (params.isVarejo) {
            newItens[indexOnChange].valorUnitarioVarejo = newValue;
        } else {
            newItens[indexOnChange].valorUnitarioAtacado = newValue;
        }

        return {
            ...params.tabelaDePreco,
            itensTabelaDePreco: newItens
        } as ITabelaDePreco;
    }
}