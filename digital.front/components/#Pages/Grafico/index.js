import React, { useState, useEffect, useMemo } from 'react'
import 'dayjs/locale/pt-br'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { BrCurrency } from '../../../utils'
import { HttpResponseAlert } from '../../Alerts'

import {
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js'

import {
    Chart as ChartJS, Line
} from '@iftek/react-chartjs-3'

import { FiAlertCircle } from "react-icons/fi"



export default function Grafico({ dadosGrafico, setDadosGrafico }) {

    dayjs.extend(utc)

    ChartJS.register(CategoryScale, LinearScale, PointElement,
        LineElement, Title, Tooltip, Legend, Filler)

    let _chartRef = React.createRef(null);

    const [options, setOptions] = useState({});
    const [newGraficoPronto, setNewGraficoPronto] = useState([]);

    const optionsSetDefault = (dadosProntosGrafico) => {
        return {
            responsive: true,
            scales: {
                x: {
                    grid: {
                        display: false,
                        tickLength: 20,
                    },
                    ticks: {
                        font: {
                            family: "'Montserrat', sans-serif",
                            weight: '600',
                            size: 12,
                        },
                    },
                    xAxes: [{
                        ticks: {
                            padding: {
                                left: 0,
                                right: 0,
                                top: 10,
                                bottom: 0,
                            },
                        }
                    }]
                },
                y: {
                    beginAtZero: false,
                    ticks: {
                        padding: 10,
                        font: {
                            family: "'Montserrat', sans-serif",
                            weight: '600',
                            size: 12,
                        },
                        callback: function (value, index, values) {
                            let result = BrCurrency(value).replace(/(\,00)/g, '')
                            let countPoints = result.split('.')
                            let limpandoZeros = countPoints[1]?.replace(/0/g, '')

                            if (countPoints.length == 3)
                                return `${countPoints[0]}${limpandoZeros > 0 ? '.' : ''}${limpandoZeros} MI`;

                            if (countPoints.length == 4)
                                return `${countPoints[0]}${limpandoZeros > 0 ? '.' : ''}${limpandoZeros} BI`;

                            if (countPoints.length == 5)
                                return `${countPoints[0]}${limpandoZeros > 0 ? '.' : ''}${limpandoZeros} TRI`;

                            return `${result}`;
                        },
                    },
                }
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 50,
                    bottom: 0,
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        title: function () {
                            return "Valor no dia:";
                        },
                        label: function (ctx) {
                            let data = dadosProntosGrafico[ctx.dataIndex];
                            return `${BrCurrency(data.valorCarteira)} ${data.icon}`;
                        },
                        labelTextColor: function (ctx) {
                            let data = dadosProntosGrafico[ctx.dataIndex];

                            return data.color == 'success' ? "#0fc96c" :
                                data.color == "danger" ? "#f13c4e" :
                                    "#0d6efd";
                        }
                    },
                    yAlign: 'bottom',
                    xAlign: 'center',
                    titleAlign: 'center',
                    bodyAlign: 'center',
                    titleFontColor: '#434343',
                    titleColor: '#434343',
                    backgroundColor: '#fff',
                    bodyColor: '#434343',
                    footerColor: '#434343',
                    displayColors: false,
                    padding: 15,
                    borderColor: 'rgba(180,180,180,1)',
                    borderWidth: 1,
                    titleFont: {
                        family: "'Montserrat', sans-serif",
                        weight: '600',
                        size: 14,
                    },
                    bodyFont: {
                        family: "'Montserrat', sans-serif",
                        size: 16,
                        weight: '600'
                    }
                },
                title: {
                    display: false
                }
            }
        }
    }

    const verifyIfValueIsGreater = (actualValue, previusValue) => {
        if (actualValue > previusValue) {
            return 1;
        }

        if (previusValue > actualValue) {
            return 2;
        }

        if (actualValue == previusValue) {
            return 0;
        }
    }

    const resultVerifyValueIsGreater = (result) => {
        switch (result) {
            case 1:
                return {
                    icon: "▲",
                    color: "success"
                }
            case 2:
                return {
                    icon: "▼",
                    color: "danger"
                }

            default:
                return {
                    icon: " –",
                    color: "secondary"
                }
        }
    }

    const handleGrafico = async (data) => {

        const arrayGraficoPronto = [];
        let verificandoValor = 0;

        if (Array.isArray(data)) {

            data = data.sort(function (a, b) {
                return new Date(a.dataAdicao) - new Date(b.dataAdicao);
            })

            arrayGraficoPronto = data.map((item, index) => {

                verificandoValor = verifyIfValueIsGreater(item.carteira,
                    index == 0 ? item.carteira : data[index - 1].carteira)

                return {
                    dataAbreviada: item.dataAbreviadaComHora,
                    data: dayjs(item.dataAdicao).format('DD/MM HH:mm'),
                    valorCarteiraConvertido: BrCurrency(item.carteira),
                    valorCarteira: item.carteira,
                    icon: resultVerifyValueIsGreater(verificandoValor).icon,
                    color: resultVerifyValueIsGreater(verificandoValor).color
                }
            })

            setOptions(optionsSetDefault(arrayGraficoPronto));
            setNewGraficoPronto(arrayGraficoPronto);

        } else {
            if (data.status != 404)
                HttpResponseAlert(data, false);
        }

    }

    useEffect(async () => {
        await handleGrafico(dadosGrafico)
    }, [dadosGrafico])


    const labels = newGraficoPronto.length > 0 ? [...newGraficoPronto.map(v => v.data)] : [];

    const data = (canvas) => {
        const ctx = canvas.getContext("2d");
        const gradient = ctx.createLinearGradient(0, 0, 0, 450);
        gradient.addColorStop(0, 'rgb(38, 137, 242)');
        gradient.addColorStop(.5, 'rgb(56, 167, 241)');
        gradient.addColorStop(1, 'rgb(38, 218, 218, .6)');


        return {
            labels,
            datasets: [
                {
                    label: 'Valor Carteira',
                    data: newGraficoPronto.map((v) => v.valorCarteira),
                    tension: 0.3,
                    borderColor: gradient,
                    backgroundColor: gradient,
                    fill: true,
                    pointRadius: 6,
                    hoverRadius: 7,
                    pointHitRadius: 15,
                    hoverBorderWidth: 3,
                    pointBorderWidth: 3,
                    pointBorderColor: '#fff',
                },
            ],
        };
    }
    const LineCustom = useMemo(() => (<Line ref={ref => _chartRef = ref} options={options} data={data} />), [newGraficoPronto])

    return (
        <>
            {
                newGraficoPronto.length > 0 ?

                    <div className='chart-container'>
                        {LineCustom}
                    </div>
                    : <div className="text-center no-history">
                        <FiAlertCircle />
                        <h3>As suas moedas ainda não foram vendidas</h3>
                    </div>
            }
        </>
    )
}
