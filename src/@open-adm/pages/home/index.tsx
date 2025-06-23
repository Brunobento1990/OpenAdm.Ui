import { Grid } from "@mui/material";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { BoxApp } from "src/@open-adm/components/box";
import { GridApp } from "src/@open-adm/components/grid";
import { LoadingAppTexto } from "src/@open-adm/components/loading/loading-app-texto";
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

const ClientesSemPedidoHome = dynamic(() => import('src/@open-adm/views/home/clientes-sem-pedido-home'), {
    ssr: false,
});

const VariacaoMensalPedidoHome = dynamic(() => import('src/@open-adm/views/home/variacao-mensal-pedido-home'), {
    ssr: false,
});

const FaturasTotalizador = dynamic(() => import('src/@open-adm/views/home/totalizacao-faturas'), {
    ssr: false,
});

const StatusPedidoHome = dynamic(() => import('src/@open-adm/views/home/pedidos-em-aberto-grafico'), {
    ssr: false,
});

export function HomePage() {

    const { fecth, statusRequisicao } = useNewApi({
        method: 'GET',
        url: 'home/adm',
        naoRenderizarResposta: true,
        statusInicial: 'loading'
    });
    const [home, setHome] = useState<IHome>();

    async function init() {
        var response = await fecth<IHome>();
        if (response)
            setHome(response);
    }

    useEffect(() => {
        init();
    }, [])

    return (
        <>
            {statusRequisicao === 'loading' && (
                <LoadingAppTexto comBox />
            )}
            <BoxApp padding="1rem">
                <GridApp container spacing={3}>
                    <Grid item xs={12} sm={9}>
                        <Movimentos movimentos={home?.movimentos ?? []} />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <BoxApp display="flex" flexDirection="column" gap="1rem">
                            <StatusPedidoHome pedidos={home?.statusPedido ?? []} />
                            <VariacaoMensalPedidoHome variacaoMensalPedido={home?.variacaoMensalPedido} />
                        </BoxApp>
                    </Grid>
                </GridApp>
            </BoxApp >
            <BoxApp padding="1rem" display="flex" flexDirection="column" gap="1rem">
                <ClientesSemPedidoHome titulo={`${home?.usuarioSemPedidoCnpj?.length ?? 0} Clientes sem pedido CNPJ`} cliente={home?.usuarioSemPedidoCnpj ?? []} />
                <ClientesSemPedidoHome titulo={`${home?.usuarioSemPedidoCpf?.length ?? 0} Clientes sem pedido CPF`} cliente={home?.usuarioSemPedidoCpf ?? []} />
            </BoxApp>
            <BoxApp padding="1rem">
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                        <AcessoUsuarioEcommerce total={home?.quantidadeDeAcessoEcommerce ?? 0} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FaturasTotalizador total={home?.totalAReceber ?? 0} />
                    </Grid>
                </Grid>
            </BoxApp>
            <BoxApp padding="1rem">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={9}>
                        <EstoquesHome estoques={home?.posicaoDeEstoques ?? []} />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <BoxApp display="flex" flexDirection="column" gap="0.5rem">
                            <TotalUsuario cor="green" titulo="Qtd clientes CNPJ" total={home?.quantidadeDeUsuarioCnpj ?? 0} />
                            <TotalUsuario cor="red" titulo="Qtd clientes CPF" total={home?.quantidadeDeUsuarioCpf ?? 0} />
                        </BoxApp>
                    </Grid>
                </Grid>
            </BoxApp>
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
