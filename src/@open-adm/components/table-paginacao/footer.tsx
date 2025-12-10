import { Pagination } from '@mui/material';
import { BoxApp } from '../box';
import { DropDownApp } from '../drop-down/drop-down-app';

const qtdPorPaginas = [
    {
        id: 5,
        descricao: '5'
    },
    {
        id: 10,
        descricao: '10'
    },
    {
        id: 20,
        descricao: '20'
    },
    {
        id: 50,
        descricao: '50'
    }
]

interface propsFooterTable {
    quantidadePagina: number;
    pagina: number;
    setPagina: (newPage: number) => void;
    quantidadePorPagina?: number;
    setQuantidadePorPagina?: (newQuantidade: number) => void;
}

export function FooterTable(props: propsFooterTable) {
    return (
        <BoxApp
            display='flex'
            alignItems='center'
            width='100%'
            justifyContent='space-between'
            gap='10px'
            height='60px'
        >
            <BoxApp width='100%' maxWidth='100px'>
                <DropDownApp
                    id='quantidadePorPagina'
                    keyLabel='descricao'
                    label='Qtd'
                    size='small'
                    value={qtdPorPaginas.find(x => x.id === props.quantidadePorPagina) || qtdPorPaginas[0]}
                    values={qtdPorPaginas}
                    onChange={(_, value) => props.setQuantidadePorPagina && props.setQuantidadePorPagina(value)}
                />
            </BoxApp>
            <BoxApp>
                <Pagination
                    count={props.quantidadePagina}
                    page={props.pagina}
                    variant='outlined'
                    shape='rounded'
                    size='small'
                    color='primary'
                    onChange={(_, newPage) => props.setPagina(newPage)}
                />
            </BoxApp>
        </BoxApp>
    );
}