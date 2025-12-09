import { TableIndex } from "src/@open-adm/components/table-paginacao";
import { colunsCategoria } from "./config";
import { useState } from "react";
import { ModalWithChildren } from "src/@open-adm/components/modal";
import { useNewApi } from "src/@open-adm/hooks/use-new-api";
import { url } from "inspector";
import { TextApp } from "src/@open-adm/components/text";

export interface Inativar {
    id: string;
    inativo: boolean
}

export function Categorias() {
    const { fecth } = useNewApi({
        method: 'PUT',
        url: 'categorias/inativar-ativar?id='
    })
    const [inativar, setInativar] = useState<Inativar>();
    function abrirModal(id: string, inativo: boolean) {
        setInativar({
            id,
            inativo
        })
    }
    const { columns } = colunsCategoria({
        inativarEcommerce: abrirModal
    });

    async function intivarCategoria() {
        if (!inativar) {
            return;
        }
        const response = await fecth<any>({
            urlParams: inativar.id ?? '',
            message: 'Categoria inativada com sucesso'
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
            <ModalWithChildren open={inativar !== undefined} close={fecharModal} confimerd={intivarCategoria}>
                <TextApp texto={`Deseja realmente ${inativar?.inativo ? 'ativar' : 'inativar'} a categoria?`} />
            </ModalWithChildren>
            <TableIndex
                columns={columns}
                url="categorias/paginacao"
                urlAdd="categoria/create"
                urlDelete="categorias/delete"
                urlEdit="categoria/edit"
                urlView="categoria/view"
                nomeDaTabela='categorias'
            />
        </>
    )
}