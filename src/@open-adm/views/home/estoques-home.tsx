import React from 'react';
import Chart from 'react-apexcharts';

interface propsTopClientesMaisPedidos {
    estoques: any[];
}

const EstoquesHome = (props: propsTopClientesMaisPedidos) => {
    const options: ApexCharts.ApexOptions = {
        chart: {
            type: 'bar'
        },
        title: {
            text: `Ultimas movimentações de estoque`
        },
        xaxis: {
            categories: props.estoques.map((x) => `${x.produto} ${x.peso ?? ''} ${x.tamanho ?? ''}`)
        }
    };

    const series: ApexAxisChartSeries | ApexNonAxisChartSeries = [
        {
            name: 'Produto',
            data: props.estoques.map((x) => x.quantidade)
        }
    ];

    return (
        <Chart options={options} series={series} type="bar" height={350} />
    );
};

export default EstoquesHome;