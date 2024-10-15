import CardStatsWithAreaChart from 'src/@open-adm/components/card-grafico';
import { formatMoney } from 'src/@open-adm/utils/format-money';

interface propsFaturasDashBoard {
    total: number;
}

const FaturasDashBoard = (props: propsFaturasDashBoard) => {
    return (
        <>
            <CardStatsWithAreaChart
                stats={formatMoney(props.total)}
                chartColor='success'
                avatarColor='success'
                title='Total a receber'
                avatarIcon='tabler:credit-card'
                chartSeries={[{ data: [6, 35, 25, 61, 32, 84, 70] }]}
            />
        </>
    )
};

export default FaturasDashBoard;