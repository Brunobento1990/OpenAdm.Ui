import { CreateFatura } from "src/@open-adm/pages/financeiro/fatura/form"

const ContasApagarCreate = () => {
    return (
        <CreateFatura
            tipo={0}
            urlVoltar="/financeiro/contas-a-pagar"
        />
    )
}

export default ContasApagarCreate
