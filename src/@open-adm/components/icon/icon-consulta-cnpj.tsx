import { IconButtonAppComTooltip } from "./icon-button-app-tool-tip";
import { listaIcones } from "src/configs/listaIcones";
import { IConsultaCnpj } from "src/@open-adm/types/consulta-cnpj";
import { useApiCnpj } from "src/@open-adm/api/use-api-cnpj";


interface IconConsultaCnpjProps {
    cnpj?: string;
    setCnpj: (consulta?: IConsultaCnpj) => void;
}

export function IconConsultaCnpj(props: IconConsultaCnpjProps) {
    const { consultar } = useApiCnpj();

    async function consultarCnpj() {
        if (!props.cnpj) {
            return;
        }
        const response = await consultar.fetch(props.cnpj);
        props.setCnpj(response);
    }

    return (
        <IconButtonAppComTooltip
            icon={
                consultar.status === "loading"
                    ? listaIcones.loading
                    : listaIcones.searchGlobal
            }
            titulo="Consultar Cnpj"
            onClick={consultarCnpj}
        />
    );
}
