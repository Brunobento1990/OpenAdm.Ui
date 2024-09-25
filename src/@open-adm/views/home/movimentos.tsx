import React from 'react';
import Chart from 'react-apexcharts';

interface propsTopClientesMaisPedidos {
    movimentos: any[];
}

const Movimentos = (props: propsTopClientesMaisPedidos) => {
    const options: ApexCharts.ApexOptions = {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Movimento produto dos ultimos 3 meses'
        },
        xaxis: {
            categories: props.movimentos.map((x) => x.mes)
        }
    };

    const series: ApexAxisChartSeries | ApexNonAxisChartSeries = [
        {
            name: 'Total',
            data: props.movimentos.map((x) => x.count)
        }
    ];

    return (
        <Chart options={options} series={series} type="bar" height={350} />
    );
};

export default Movimentos;