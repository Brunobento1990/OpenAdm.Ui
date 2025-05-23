import { ThemeColor } from 'src/@core/layouts/types';
import CardStatsWithAreaChart from 'src/@open-adm/components/card-grafico';

interface propsTotalUsuarios {
    total: number;
    titulo: string;
    cor: ThemeColor
}

const TotalUsuarios = (props: propsTotalUsuarios) => {
    return (
        <>
            <CardStatsWithAreaChart
                stats={`${props.total}`}
                chartColor={props.cor}
                avatarColor='success'
                title={props.titulo}
                avatarIcon='tabler:credit-card'
                chartSeries={[{ data: [5, 12, 46, 10, 56, 31, 70] }]}
            />
        </>
    )
};

export default TotalUsuarios;