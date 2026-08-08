import { CreateFatura } from "src/@open-adm/pages/financeiro/fatura/form"
import { TipoFaturaEnum } from "src/@open-adm/enuns/tipo-fatura-enum"

const ContasAReceberCreate = () => {
    return (
        <CreateFatura
            tipo={TipoFaturaEnum.AReceber}
            urlVoltar="/financeiro/contas-a-receber"
        />
    )
}

export default ContasAReceberCreate
