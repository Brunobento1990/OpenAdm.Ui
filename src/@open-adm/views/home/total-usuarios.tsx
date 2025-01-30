import CardStatsWithAreaChart from 'src/@open-adm/components/card-grafico';

interface propsTotalUsuarios {
    total: number;
}

const TotalUsuarios = (props: propsTotalUsuarios) => {
    return (
        <>
            <CardStatsWithAreaChart
                stats={`${props.total}`}
                chartColor='error'
                avatarColor='success'
                title='Total de clientes'
                avatarIcon='tabler:credit-card'
                chartSeries={[{ data: [5, 12, 46, 10, 56, 31, 70] }]}
            />
        </>
    )
};

export default TotalUsuarios;