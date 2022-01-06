import React, { useState, useEffect } from 'react'
import 'dayjs/locale/pt-br'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { HistoricoCarteiraCall } from '../../../services/ContaService'
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

export default function Grafico({ user }) {

    const [dataGrafico, setDataGrafico] = useState([]);
    ChartJS.register(CategoryScale, LinearScale, PointElement,
        LineElement, Title, Tooltip, Legend, Filler)

    dayjs.extend(utc)

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

    const handleGrafico = async () => {
        const response = await HistoricoCarteiraCall(user.token);
        const arrayGraficoPronto = [];
        let verificandoValor = 0;

        if (Array.isArray(response.result)) {

            response.result = response.result.sort(function (a, b) {
                return new Date(a.dataAdicao) - new Date(b.dataAdicao);
            })

            arrayGraficoPronto = response.result.map((item, index) => {

                verificandoValor = verifyIfValueIsGreater(item.carteira,
                    index == 0 ? item.carteira : response.result[index - 1].carteira)

                return {
                    dataAbreviada: item.dataAbreviadaComHora,
                    data: dayjs(item.dataAdicao).utc().format('DD/MM HH[h]'),
                    valorCarteiraConvertido: BrCurrency(item.carteira),
                    valorCarteira: item.carteira,
                    icon: resultVerifyValueIsGreater(verificandoValor).icon,
                    color: resultVerifyValueIsGreater(verificandoValor).color
                }
            })
            console.log(arrayGraficoPronto)

            setDataGrafico(arrayGraficoPronto);
        } else {
            HttpResponseAlert(response, false);
        }

    }


    useEffect(() => {
        handleGrafico()
    }, [])


    const options = {
        responsive: true,
        animation: false,
        scales: {
            x: {
                grid: {
                    display: false
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
                        }
                    }
                }],
            },
            y: {
                beginAtZero: true,
                ticks: {
                    font: {
                        family: "'Montserrat', sans-serif",
                        weight: '600',
                        size: 12,
                    },
                    callback: function (value, index, values) {
                        return `${BrCurrency(value)}`;
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
                        let data = dataGrafico[ctx.dataIndex];
                        return `${BrCurrency(data.valorCarteira)} ${data.icon}`;
                    },
                    labelTextColor: function (ctx) {
                        let data = dataGrafico[ctx.dataIndex];

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
            },
        },
    };

    const labels = [...dataGrafico.map(v => v.data)];


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
                    data: dataGrafico.map((v) => v.valorCarteira),
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

    return (
        <>
            {
                dataGrafico ?

                    <div className='chart-container'>
                        <Line options={options} data={data} height={150} />
                    </div>
                    : <div className="text-center no-history">
                        <FiAlertCircle />
                        <h3>As suas moedas ainda não foram vendidas</h3>
                    </div>
            }
        </>
    )
}
