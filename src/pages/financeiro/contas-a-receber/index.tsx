import { FaturaPaginacao } from "src/@open-adm/pages/financeiro/fatura"
import { TipoFaturaEnum } from "src/@open-adm/enuns/tipo-fatura-enum"

const ContasAReceber = () => {
    return (
        <FaturaPaginacao
            tipo={TipoFaturaEnum.AReceber}
            urlAdd="contas-a-receber/create"
            urlEdit="contas-a-receber/edit"
            urlView="contas-a-receber/view"
        />
    )
}

export default ContasAReceber
