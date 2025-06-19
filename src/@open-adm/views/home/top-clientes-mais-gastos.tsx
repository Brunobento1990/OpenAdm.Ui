import { ApexOptions } from 'apexcharts';
import React from 'react';
import Chart from 'react-apexcharts';

interface propsTopClientesMaisGastos {
    topUsuarios: any[];
}

const TopClientesMaisGastos = (props: propsTopClientesMaisGastos) => {

    const options: ApexOptions = {
        chart: {
            type: 'pie'
        },
        labels: props.topUsuarios.map((x) => x.usuario),
        title: {
            text: 'Top 3 Clientes com mais gastos'
        }
    };

    const series = props.topUsuarios.map((x) => x.totalCompra);

    return (
        <Chart options={options} series={series} type="pie" height={550} />
    );
};

export default TopClientesMaisGastos;