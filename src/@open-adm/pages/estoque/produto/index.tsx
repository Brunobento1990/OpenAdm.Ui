import { useState } from 'react';
import { colunsProduto } from './config'
import { TableIndex } from "src/@open-adm/components/table-paginacao";
import { useNewApi } from 'src/@open-adm/hooks/use-new-api';
import { Inativar } from '../categorias';
import { ModalWithChildren } from 'src/@open-adm/components/modal';
import { TextApp } from 'src/@open-adm/components/text';

export function Produtos() {
    const { fecth } = useNewApi({
        method: 'PUT',
        url: 'produtos/inativar-ativar?id='
    })
    const [inativar, setInativar] = useState<Inativar>();
    function abrirModal(id: string, inativo: boolean) {
        setInativar({
            id,
            inativo
        })
    }
    const { columns } = colunsProduto({
        inativarEcommerce: abrirModal
    });

    async function intivarProduto() {
        if (!inativar) {
            return;
        }
        const response = await fecth<any>({
            urlParams: inativar.id ?? '',
            message: 'Produto inativado com sucesso'
        })

        if (response?.result) {
            fecharModal()
        }
    }

    function fecharModal() {
        setInativar(undefined)
    }
    return (
        <>
            <ModalWithChildren open={inativar !== undefined} close={fecharModal} confimerd={intivarProduto}>
                <TextApp texto={`Deseja realmente ${inativar?.inativo ? 'ativar' : 'inativar'} o produto?`} />
            </ModalWithChildren>
            <TableIndex
                columns={columns}
                url="produtos/paginacao"
                urlAdd="produto/create"
                urlDelete="produtos/delete"
                urlEdit="produto/edit"
                urlView="produto/view"
                minWidth={1600}
            />
        </>
    )
}