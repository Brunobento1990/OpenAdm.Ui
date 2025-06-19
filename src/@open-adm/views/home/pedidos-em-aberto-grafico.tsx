import { BoxApp } from 'src/@open-adm/components/box';
import CardStatsWithAreaChart from 'src/@open-adm/components/card-grafico';
import { CardCustom } from 'src/@open-adm/components/cards';
import { StatusApp } from 'src/@open-adm/components/chip';
import { TextApp } from 'src/@open-adm/components/text';
import { statusPedido } from 'src/@open-adm/enuns/status-pedido';
import { IStatusPedidoHome } from 'src/@open-adm/types/home';

interface propsPedidoEmAbertoGrafico {
    pedidos: IStatusPedidoHome[];
}

const StatusPedidoHome = (props: propsPedidoEmAbertoGrafico) => {
    return (
        <CardCustom>
            <BoxApp width='100%' padding='1rem' display='flex' flexDirection='column' gap='1rem'>
                <TextApp texto='Status dos pedidos' fontSize='1.2rem' fontWeight={600} />
                {props.pedidos.map((x, i) => {
                    const status = statusPedido[x.status]
                    return (
                        <BoxApp key={i} display='flex' alignItems='center' justifyContent='space-between'>
                            <TextApp texto={`${x.quantidade} ${x.quantidade > 1 ? 'pedidos' : 'pedido'}`} />
                            <StatusApp
                                cor={status.color}
                                titulo={status.title}
                            />
                        </BoxApp>
                    )
                })}
            </BoxApp>
        </CardCustom>
    )
};

export default StatusPedidoHome;