import { Pagination } from '@mui/material';
import { BoxApp } from '../box';
interface propsFooterTable {
    quantidadePagina: number;
    pagina: number;
    setPagina: (newPage: number) => void;
}

export function FooterTable(props: propsFooterTable) {
    return (
        <BoxApp
            display='flex'
            alignItems='center'
            width='100%'
            justifyContent='space-between'
            gap='10px'
            height='20px'
        >
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