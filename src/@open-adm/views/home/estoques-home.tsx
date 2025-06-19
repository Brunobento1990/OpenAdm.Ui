import React from 'react';
import Chart from 'react-apexcharts';
import { BoxApp } from 'src/@open-adm/components/box';
import { CardCustom } from 'src/@open-adm/components/cards';
import { TableApp } from 'src/@open-adm/components/table/table-app';
import { TextApp } from 'src/@open-adm/components/text';
import { IPosicaoEstoqueHome } from 'src/@open-adm/types/home';

interface propsTopClientesMaisPedidos {
    estoques: any[];
}

const EstoquesHome = (props: propsTopClientesMaisPedidos) => {
    return (
        <CardCustom>
            <TextApp texto='Posição de estoque' fontSize='1.2rem' fontWeight={600} padding='1rem' />
            <TableApp columns={[{
                field: 'foto',
                headerName: 'Produto',
                renderCell: (row: IPosicaoEstoqueHome) => {
                    return (
                        <BoxApp display='flex' alignItems='center' gap='10px'>
                            <img src={row.foto} style={{ maxWidth: '30px' }} />
                            <TextApp texto={row.produto} />
                        </BoxApp>
                    )
                }
            },
            {
                field: 'quantidade',
                headerName: 'Quantidade',
            },
            {
                field: 'pesoTamanho',
                headerName: 'Peso/Tamanho',
                renderCell: (row: IPosicaoEstoqueHome) => row.peso ? row.peso : row.tamanho
            }]} rows={props.estoques ?? []} stickyHeader />
        </CardCustom>
    );
};

export default EstoquesHome;