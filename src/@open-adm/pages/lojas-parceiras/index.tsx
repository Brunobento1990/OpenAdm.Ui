import { columns } from './config'
import { TableIndex } from "src/@open-adm/components/table-paginacao";

export function LojasParceirasPaginacao() {
    return (
        <TableIndex
            columns={columns}
            url="lojas-parceiras/paginacao"
            urlAdd="lojas-parceiras/create"
            urlDelete="lojas-parceiras/delete"
            urlView="lojas-parceiras/view"
            urlEdit="lojas-parceiras/edit"
            nomeDaTabela='lojas-parceiras'
        />
    )
}