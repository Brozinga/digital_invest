import React, { useState, useMemo, useEffect } from 'react'

import 'dayjs/locale/pt-br'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { BrCurrency } from '../../../utils'

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

import Loading from '../../Loading'
import { Accordion } from 'react-bootstrap'

export default function GraficosMoedas({ dados, title, indice }) {

    let _chartRef = React.createRef(null);

    const [dadosGrafico, setDadosGrafico] = useState([])
    const [options, setOptions] = useState({})

    dayjs.extend(utc)

    ChartJS.register(CategoryScale, LinearScale, PointElement,
        LineElement, Title, Tooltip, Legend, Filler)

    const optionsSetDefault = (dadosProntosGrafico) => {
        return {
            responsive: true,
            animations: false,
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
                            }
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
                            let dataLocal = dadosProntosGrafico[ctx.dataIndex];
                            return `${BrCurrency(dataLocal.valor)} ${dataLocal.icon}`;
                        },
                        labelTextColor: function (ctx) {
                            let dataLocal = dadosProntosGrafico[ctx.dataIndex];

                            return dataLocal.color == 'success' ? "#0fc96c" :
                                dataLocal.color == "danger" ? "#f13c4e" :
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

    useEffect(() => {
        if (dados.cotacoes.length > 0) {

            let dadosTransformados = dados.cotacoes.map((v, i) => {
                let lastData = dados.cotacoes[i == 0 ? 0 : i - 1];
                let verifyGreater = verifyIfValueIsGreater(v.valorCotado,
                    lastData.valorCotado)

                const { icon, color } = resultVerifyValueIsGreater(verifyGreater)
                return {
                    valor: v.valorCotado,
                    icon,
                    color,
                    data: v.dataCotacao
                }
            })

            setDadosGrafico(dadosTransformados)
            setOptions(optionsSetDefault(dadosTransformados))

        }
    }, [dados])

    const data = canvas => {
        const ctx = canvas.getContext("2d");
        const gradient = ctx.createLinearGradient(0, 0, 0, 450);
        gradient.addColorStop(0, 'rgb(38, 137, 242)');
        gradient.addColorStop(.5, 'rgb(56, 167, 241)');
        gradient.addColorStop(1, 'rgb(38, 218, 218, .6)');

        return {
            labels: dadosGrafico.map(v => dayjs(v.data).format("DD/MM HH[h]")),
            datasets: [
                {
                    label: 'Valor Cotado',
                    data: dadosGrafico.map((v) => v.valor),
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

    const LineCustom = useMemo(() => (<Line ref={ref => _chartRef = ref} options={options} data={data} />), [dados, options])

    return (
        <Accordion.Item eventKey={indice} className="mt-4 m-lg-4">
            <Accordion.Header className='moeda-grafico-title'>
                {title}
            </Accordion.Header>
            <Accordion.Body className='moeda-grafico-container mb-3 p-lg-3'>
                {
                    !dadosGrafico.length ?
                        <Loading /> :
                        LineCustom
                }
            </Accordion.Body>
        </Accordion.Item>
    )
}
