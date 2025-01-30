import CardStatsWithAreaChart from 'src/@open-adm/components/card-grafico';

interface propsAcessoUsuarioEcommerce {
    total: number;
}

const AcessoUsuarioEcommerce = (props: propsAcessoUsuarioEcommerce) => {
    return (
        <>
            <CardStatsWithAreaChart
                stats={`${props.total}`}
                chartColor='primary'
                avatarColor='success'
                title='Total de acesso ecommerce'
                avatarIcon='tabler:credit-card'
                chartSeries={[{ data: [5, 12, 46, 10, 56, 31, 70] }]}
            />
        </>
    )
};

export default AcessoUsuarioEcommerce;