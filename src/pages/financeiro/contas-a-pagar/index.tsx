import { ContasAReceberPaginacao } from "src/@open-adm/pages/financeiro/contas-a-receber"
import { FaturaPaginacao } from "src/@open-adm/pages/financeiro/fatura"

const ContasApagar = () => {
    return (
        <FaturaPaginacao
            tipo={0}
            urlAdd="contas-a-pagar/create"
            urlEdit="contas-a-pagar/edit"
            urlView="contas-a-pagar/view"
        />
    )
}

export default ContasApagar
