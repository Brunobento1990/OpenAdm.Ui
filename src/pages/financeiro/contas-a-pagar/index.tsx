import { FaturaPaginacao } from "src/@open-adm/pages/financeiro/fatura"
import { TipoFaturaEnum } from "src/@open-adm/enuns/tipo-fatura-enum"

const ContasApagar = () => {
    return (
        <FaturaPaginacao
            tipo={TipoFaturaEnum.APagar}
            urlAdd="contas-a-pagar/create"
            urlEdit="contas-a-pagar/edit"
            urlView="contas-a-pagar/view"
        />
    )
}

export default ContasApagar
