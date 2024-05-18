import { useNewApi } from "src/@open-adm/hooks/use-new-api";

interface propsApiDropDown {
    url: string;
    pagina: number;
    quantidadeDePagina: number;
}

export function apiDropDown(props: propsApiDropDown) {
    const { fecth } = useNewApi({
        method: "GET",
        url: props.url,
        notAlert: true,
    });

    async function fetchDropDown() {
        return await fecth<any>({
            urlParams: `?skip=${props.pagina}&take=${props.quantidadeDePagina}`
        })
    }

    return {
        fetchDropDown
    }
}