import { CreateFatura } from "src/@open-adm/pages/financeiro/fatura/form"

const ContasAReceberCreate = () => {
    return (
        <CreateFatura
            tipo={1}
            urlVoltar="/financeiro/contas-a-receber"
        />
    )
}

export default ContasAReceberCreate
