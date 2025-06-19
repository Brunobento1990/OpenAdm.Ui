import { BoxApp } from "src/@open-adm/components/box"
import { CardCustom } from "src/@open-adm/components/cards"
import { DividerApp } from "src/@open-adm/components/divider"
import { IconApp } from "src/@open-adm/components/icon"
import { TextApp } from "src/@open-adm/components/text"
import { IVariacaoMensalPedido } from "src/@open-adm/types/home"

interface PropsVariacaoMensalPedidoHome {
    variacaoMensalPedido?: IVariacaoMensalPedido
}

function VariacaoMensalPedidoHome(props: PropsVariacaoMensalPedidoHome) {
    if (!props.variacaoMensalPedido) {
        return <></>
    }
    const variacao = props.variacaoMensalPedido;
    const corVariacaoPorcentagem = variacao.porcentagem > 0 ? 'green' : 'red';
    return (
        <CardCustom>
            <BoxApp padding="1rem">
                <BoxApp display="flex" alignItems="center" justifyContent="space-between">
                    <TextApp fontWeight={600} texto={`Mês: ${variacao.mes}`} />
                    <BoxApp
                        backgroundColor="red"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        width="35px"
                        height="35px"
                        borderRadius="50%"
                    >
                        <IconApp icon='material-symbols-light:shopping-cart' color="white" />
                    </BoxApp>
                </BoxApp>
                <BoxApp display="flex" alignItems="center">
                    <TextApp fontSize="1.2rem" fontWeight={600} texto={`${variacao.porcentagem}%`} color={corVariacaoPorcentagem} />
                    <IconApp icon={variacao.porcentagem > 0 ? 'lucide:arrow-up' : 'lucide:arrow-down'} color={corVariacaoPorcentagem} />
                </BoxApp>
                <DividerApp width="100%" />
                <BoxApp marginTop="1rem">
                    <TextApp texto={`${variacao.anoAnterior}: ${variacao.totalAnoAnterior} pedidos`} />
                    <TextApp texto={`${variacao.anoAtual}: ${variacao.totalAnoAtual} pedidos`} />
                </BoxApp>
            </BoxApp>
        </CardCustom>
    )
}

export default VariacaoMensalPedidoHome;
