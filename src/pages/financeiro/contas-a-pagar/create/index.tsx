import { CreateFatura } from "src/@open-adm/pages/financeiro/fatura/form"
import { TipoFaturaEnum } from "src/@open-adm/enuns/tipo-fatura-enum"

const ContasApagarCreate = () => {
    return (
        <CreateFatura
            tipo={TipoFaturaEnum.APagar}
            urlVoltar="/financeiro/contas-a-pagar"
        />
    )
}

export default ContasApagarCreate
