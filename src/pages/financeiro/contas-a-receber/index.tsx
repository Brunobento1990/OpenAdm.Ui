import { FaturaPaginacao } from "src/@open-adm/pages/financeiro/fatura"

const ContasAReceber = () => {
    return (
        <FaturaPaginacao
            tipo={1}
            urlAdd="contas-a-receber/create"
            urlEdit="contas-a-receber/edit"
            urlView="contas-a-receber/view"
        />
    )
}

export default ContasAReceber
