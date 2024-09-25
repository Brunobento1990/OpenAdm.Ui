import { Grid } from "@mui/material";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useNewApi } from "src/@open-adm/hooks/use-new-api";
import { IHome } from "src/@open-adm/types/home";

const TopClientesMaisGastos = dynamic(() => import('src/@open-adm/views/home/top-clientes-mais-gastos'), {
    ssr: false,
});

const TopClientesMaisPedidos = dynamic(() => import('src/@open-adm/views/home/top-clientes-mais-pedidos'), {
    ssr: false,
});

const Movimentos = dynamic(() => import('src/@open-adm/views/home/movimentos'), {
    ssr: false,
});

export function HomePage() {

    const { fecth } = useNewApi({
        method: 'GET',
        url: 'home/adm',
        notAlert: true
    });
    const [home, setHome] = useState<IHome>();

    async function init() {
        try {
            var response = await fecth<IHome>();
            if (response)
                setHome(response);
        } catch (error) {

        }
    }

    useEffect(() => {
        init();
    }, [])

    return (
        <>
            <Grid container spacing={5} padding={2}>
                <Grid item xs={12} sm={6}>
                    <TopClientesMaisGastos topUsuarios={home?.topUsuariosTotalCompra ?? []} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TopClientesMaisPedidos topUsuarios={home?.topUsuariosTotalPedido ?? []} />
                </Grid>
            </Grid>
            <Grid container spacing={5} padding={2}>
                <Grid item xs={12} sm={6}>
                    <Movimentos movimentos={home?.movimentos ?? []} />
                </Grid>
            </Grid>
        </>
    )
}
