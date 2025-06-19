"use client";

import React from "react";
import { useTheme } from "@mui/material/styles";
import dynamic from "next/dynamic";
import { IMovimentoProdutoHome } from "src/@open-adm/types/home";
import { CardCustom } from "src/@open-adm/components/cards";
import { TextApp } from "src/@open-adm/components/text";
import { palavraNoPlural } from "src/@open-adm/utils/palavra-no-plural";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface PropsMovimentoProdutoHomePage {
    movimentos: IMovimentoProdutoHome[];
}

const MovimentoProdutoHomePage = (props: PropsMovimentoProdutoHomePage) => {
    // chart color
    const theme = useTheme();
    const countMovimento = props.movimentos.length;
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;

    const categorias = Array.from(
        new Set(
            props.movimentos.flatMap((mov) =>
                mov.dados.map((d: any) => d.categoria.trim())
            )
        )
    );

    const seriescolumnchart = categorias.map((categoria) => ({
        name: categoria,
        data: props.movimentos.map((mov) => {
            const item = mov.dados.find((d: any) => d.categoria.trim() === categoria);
            return item ? item.quantidade : 0;
        }),
    }));

    // chart
    const optionscolumnchart: any = {
        chart: {
            type: "bar",
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: "#adb0bb",
            toolbar: {
                show: true,
            },
            height: 370,
        },
        colors: [primary, secondary],
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: "60%",
                columnWidth: "42%",
                borderRadius: [6],
                borderRadiusApplication: "end",
                borderRadiusWhenStacked: "all",
            },
        },

        stroke: {
            show: true,
            width: 5,
            lineCap: "butt",
            colors: ["transparent"],
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        grid: {
            borderColor: "rgba(0,0,0,0.1)",
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            tickAmount: 4,
        },
        xaxis: {
            categories: props.movimentos.map((x) => x.mes),
            axisBorder: {
                show: false,
            },
        },
        tooltip: {
            theme: "dark",
            fillSeriesColor: false,
        },
    };
    return (
        <CardCustom>
            <TextApp padding="1rem" fontSize="1.2rem" fontWeight={600} texto={`Movimentação de ${palavraNoPlural('produto', 'produtos', countMovimento)} ${palavraNoPlural('no', 'nos', countMovimento)} ${palavraNoPlural('ultimo', 'ultimos', countMovimento)} ${props.movimentos.length} ${palavraNoPlural('mês', 'mese', countMovimento)}`} />
            <Chart
                options={{
                    ...optionscolumnchart,
                    chart: {
                        toolbar: {
                            show: true,
                            tools: {
                                download: false,
                                selection: true,
                                zoom: true,
                                zoomin: true,
                                zoomout: true,
                                pan: true,
                                reset: true,
                            },
                        },
                    },
                }}
                series={seriescolumnchart}
                type="bar"
                height={370}
                width={"100%"}
            />
        </CardCustom>
    );
};

export default MovimentoProdutoHomePage;
