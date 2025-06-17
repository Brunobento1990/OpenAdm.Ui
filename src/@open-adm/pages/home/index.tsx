import { Grid } from "@mui/material";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { BoxApp } from "src/@open-adm/components/box";
import { useNewApi } from "src/@open-adm/hooks/use-new-api";
import { IHome } from "src/@open-adm/types/home";

const TopClientesMaisGastos = dynamic(() => import('src/@open-adm/views/home/top-clientes-mais-gastos'), {
    ssr: false,
});


const TotalUsuario = dynamic(() => import('src/@open-adm/views/home/total-usuarios'), {
    ssr: false,
});

const AcessoUsuarioEcommerce = dynamic(() => import('src/@open-adm/views/home/acesso-usuario-ecommerce'), {
    ssr: false,
});

const TopClientesMaisPedidos = dynamic(() => import('src/@open-adm/views/home/top-clientes-mais-pedidos'), {
    ssr: false,
});

const Movimentos = dynamic(() => import('src/@open-adm/views/home/movimentos'), {
    ssr: false,
});

const EstoquesHome = dynamic(() => import('src/@open-adm/views/home/estoques-home'), {
    ssr: false,
});

const Faturas = dynamic(() => import('src/@open-adm/views/home/faturas'), {
    ssr: false,
});

const FaturasTotalizador = dynamic(() => import('src/@open-adm/views/home/totalizacao-faturas'), {
    ssr: false,
});

const PedidosEmEbrtoGrafico = dynamic(() => import('src/@open-adm/views/home/pedidos-em-aberto-grafico'), {
    ssr: false,
});

export function HomePage() {

    const { fecth } = useNewApi({
        method: 'GET',
        url: 'home/adm',
        naoRenderizarResposta: true
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
            <BoxApp padding="1rem">
                <Grid container spacing={5} padding={2}>
                    {home?.quantidadeDeUsuarioCnpj && home.quantidadeDeUsuarioCnpj > 0 ? (
                        <Grid item xs={12} sm={6}>
                            <TotalUsuario cor="success" titulo="Qtd clientes CNPJ" total={home.quantidadeDeUsuarioCnpj} />
                        </Grid>
                    ) : (<></>)}
                    {home?.quantidadeDeUsuarioCpf && home.quantidadeDeUsuarioCpf > 0 ? (
                        <Grid item xs={12} sm={6}>
                            <TotalUsuario cor="error" titulo="Qtd clientes CPF" total={home.quantidadeDeUsuarioCpf} />
                        </Grid>
                    ) : (<></>)}
                    {home?.quantidadeDeAcessoEcommerce && home.quantidadeDeAcessoEcommerce > 0 ? (
                        <Grid item xs={12} sm={6}>
                            <AcessoUsuarioEcommerce total={home.quantidadeDeAcessoEcommerce} />
                        </Grid>
                    ) : (<></>)}
                    {home?.totalAReceber && home?.totalAReceber > 0 ?
                        <Grid item xs={12} sm={6}>
                            <FaturasTotalizador total={home.totalAReceber} />
                        </Grid> : <></>
                    }
                    {home?.pedidosEmAberto && home?.pedidosEmAberto > 0 ?
                        <Grid item xs={12} sm={6}>
                            <PedidosEmEbrtoGrafico total={home.pedidosEmAberto} />
                        </Grid> : <></>
                    }
                </Grid>
            </BoxApp>
            <Grid container spacing={5} padding={2}>
                {home?.faturas && home.faturas?.length ?
                    <Grid item xs={12} sm={6}>
                        <Faturas faturas={home?.faturas ?? []} />
                    </Grid> : <></>
                }
                <Grid item xs={12} sm={6}>
                    <Movimentos movimentos={home?.movimentos ?? []} />
                </Grid>
                {home?.posicaoDeEstoques && home.posicaoDeEstoques?.length ?
                    <Grid item xs={12} sm={6}>
                        <EstoquesHome estoques={home?.posicaoDeEstoques ?? []} />
                    </Grid> : <></>
                }
            </Grid>
            <Grid container spacing={5} padding={2}>
                <Grid item xs={12} sm={6}>
                    <TopClientesMaisGastos topUsuarios={home?.topUsuariosTotalCompra ?? []} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TopClientesMaisPedidos topUsuarios={home?.topUsuariosTotalPedido ?? []} />
                </Grid>
            </Grid>
        </>
    )
}
