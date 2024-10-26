import { Pagination, Typography } from '@mui/material';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { BoxApp } from '../box';
import { DropDown } from '../drop-down';

const opcoesDeQuantidadePorPagina = [
    {
        id: 1,
        label: '5',
    },
    {
        id: 2,
        label: '10',
    },
    {
        id: 3,
        label: '15',
    },
    {
        id: 4,
        label: '20',
    },
    {
        id: 5,
        label: '25',
    },
    {
        id: 6,
        label: '30',
    },
    {
        id: 7,
        label: '35',
    },
    {
        id: 8,
        label: '40',
    },
    {
        id: 9,
        label: '45',
    },
    {
        id: 10,
        label: '50',
    },
];

interface propsFooterTable {
    length: number;
    totalDeRegistros: number;
    quantidadePagina: number;
    quantidadePorPagina: number;
    pagina: number;
    setPagina: (newPage: number) => void;
    setQuantidadePorPagina: (newPage: number) => void;
}

export function FooterTable(props: propsFooterTable) {
    const { setItem } = useLocalStorage();

    return (
        <BoxApp
            display='flex'
            alignItems='center'
            width='100%'
            justifyContent='space-between'
            gap='10px'
            height='20px'
        >
            <BoxApp display='flex' alignItems='center' gap='10px'>
                <Typography fontSize={'12px'}>Registros por página:</Typography>
                <DropDown
                    width='100px'
                    id='quantidadePorPagina'
                    key='id'
                    keyLabel='label'
                    label=''
                    values={opcoesDeQuantidadePorPagina}
                    value={opcoesDeQuantidadePorPagina.find(
                        (x) => x.label === props.quantidadePorPagina.toString(),
                    )}
                    onChange={(_, newValue) => {
                        const id =
                            typeof newValue === 'string' ? parseInt(newValue) : newValue;
                        const newV = opcoesDeQuantidadePorPagina.find(
                            (x) => x.id === id,
                        )?.label;
                        setItem(
                            'quantidade-por-pagina',
                            newV?.toString() ?? '5',
                        );
                        props.setQuantidadePorPagina(parseInt(newV ?? '5'));
                    }}
                />
                <Typography fontSize={'12px'}>{`Exibindo ${props.length} registros de ${props.totalDeRegistros}`}</Typography>
            </BoxApp>
            <Pagination
                count={props.quantidadePagina}
                page={props.pagina}
                variant='outlined'
                shape='rounded'
                color='primary'
                onChange={(_, newPage) => props.setPagina(newPage)}
            />
        </BoxApp>
    );
}