import { useEffect, useState } from "react";
import { useApi } from "src/@open-adm/hooks/use-api";
import { IHome } from "src/@open-adm/types/home";
import CardProdutosMaisVendidos from "src/@open-adm/views/home/card-produtos-mais-vendidos";
import CardVendasNoMes from "src/@open-adm/views/home/card-vendas-no-mes";

export function HomePage() {

    const { get } = useApi();
    const [home, setHome] = useState<IHome>();

    async function init() {
        try {
            // var response = await get("home/list") as IHome;
            // setHome(response);
        } catch (error) {

        }
    }

    useEffect(() => {
        init();
    }, [])

    return (
        <>
            <CardVendasNoMes
                quantidade={home?.quantidadeVendasNoMes ?? 0}
            />
            <CardProdutosMaisVendidos
                produtos={home?.produtosMaisVendidosViewModel ?? []}
            />
        </>
    )
}