import CardStatsWithAreaChart from 'src/@open-adm/components/card-grafico';
import { formatMoney } from 'src/@open-adm/utils/format-money';

interface propsPedidoEmAbertoGrafico {
    total: number;
}

const PedidosEmAbertoGrafico = (props: propsPedidoEmAbertoGrafico) => {
    return (
        <>
            <CardStatsWithAreaChart
                stats={`${props.total}`}
                chartColor='warning'
                avatarColor='warning'
                title='Pedidos em aberto'
                avatarIcon='tabler:credit-card'
                chartSeries={[{ data: [65, 18, 54, 75, 15, 75, 91] }]}
            />
        </>
    )
};

export default PedidosEmAbertoGrafico;