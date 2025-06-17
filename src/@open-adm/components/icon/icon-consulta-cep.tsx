import { IEnderecoBase } from "src/@open-adm/types/base";
import { IconButtonAppComTooltip } from "./icon-button-app-tool-tip";
import { listaIcones } from "src/configs/listaIcones";
import { useApiCep } from "src/@open-adm/api/use-api-cep";


interface IconConsultaCepProps {
    cep?: string;
    setEndereco: (endereco?: IEnderecoBase) => void;
}

export function IconConsultaCep(props: IconConsultaCepProps) {
    const { consulta } = useApiCep();

    async function consultarCep() {
        if (!props.cep) {
            return;
        }
        const response = await consulta.fetch(props.cep);
        props.setEndereco(response);
    }

    return (
        <IconButtonAppComTooltip
            icon={
                consulta.status === "loading"
                    ? listaIcones.loading
                    : listaIcones.searchGlobal
            }
            titulo="Consultar cep"
            onClick={consultarCep}
        />
    );
}
