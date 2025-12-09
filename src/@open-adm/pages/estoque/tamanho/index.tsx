import { columns } from './config'
import { TableIndex } from "src/@open-adm/components/table-paginacao";

export function Tamanhos() {

    return (
        <TableIndex
            url="tamanhos/paginacao"
            columns={columns}
            urlAdd="tamanho/create"
            urlDelete="tamanhos/delete"
            urlEdit="tamanho/edit"
            urlView="tamanho/view"
            nomeDaTabela="tamanhos"
        />
    )
}