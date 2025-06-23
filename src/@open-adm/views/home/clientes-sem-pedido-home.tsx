import React from 'react';
import { CardCustom } from 'src/@open-adm/components/cards';
import { TableApp } from 'src/@open-adm/components/table/table-app';
import { TextApp } from 'src/@open-adm/components/text';
import { ICliente } from 'src/@open-adm/types/cliente';
import { maskCNPJ, maskCPF, maskPhone } from 'src/@open-adm/utils/mask';

interface propsTopClientesMaisPedidos {
    cliente: ICliente[];
    titulo: string
}

const EstoquesHome = (props: propsTopClientesMaisPedidos) => {
    return (
        <CardCustom>
            <TextApp texto={props.titulo} fontSize='1.2rem' fontWeight={600} padding='1rem' />
            <TableApp
                maxHeigth={'500px'}
                columns={[
                    {
                        field: 'numero',
                        headerName: 'N°',
                    },
                    {
                        field: 'nome',
                        headerName: 'Nome',
                    },
                    {
                        field: 'cpfCnpj',
                        headerName: 'CPF/CNPJ',
                        renderCell: (row: ICliente) => row.cpf ? maskCPF(row.cpf) : maskCNPJ(row.cnpj)
                    },
                    {
                        field: 'telefone',
                        headerName: 'Telefone',
                        renderCell: (row: ICliente) => maskPhone(row.telefone)
                    },
                ]}
                rows={props.cliente ?? []}
                stickyHeader
            />
        </CardCustom>
    );
};

export default EstoquesHome;