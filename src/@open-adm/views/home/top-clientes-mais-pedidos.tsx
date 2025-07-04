import React from 'react';
import Chart from 'react-apexcharts';

interface propsTopClientesMaisPedidos {
    topUsuarios: any[];
}

const TopClientesMaisPedidos = (props: propsTopClientesMaisPedidos) => {
    const options: ApexCharts.ApexOptions = {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Top 3 Clientes com mais pedidos'
        },
        xaxis: {
            categories: props.topUsuarios.map((x) => x.usuario)
        }
    };

    const series: ApexAxisChartSeries | ApexNonAxisChartSeries = [
        {
            name: 'Pedidos',
            data: props.topUsuarios.map((x) => x.totalPedidos)
        }
    ];

    return (
        <Chart options={options} series={series} type="bar" height={350} />
    );
};

export default TopClientesMaisPedidos;