import React from 'react'
import Image from 'next/image'
import { FiArrowUp, FiArrowDown, FiMinus } from 'react-icons/fi'

import 'dayjs/locale/pt-br'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import Card from '../../Card'
import { BrCurrency } from '../../../utils'
import Loading from '../../Loading'


export default function CardListagemMoedas({ dados }) {

    dayjs.extend(utc)

    const customLoadImage = ({ src }) => {
        return `${document.location.origin}/moedas/${src}`
    }

    const filtrarUltima = (cotacoes) => {
        return cotacoes[cotacoes.length - 1]
    }

    const pegarUltimoValor = (dado) => {

        let penultimaCotacao = dado.cotacoes[dado.cotacoes.length - 2];

        let ultimaCotacao = filtrarUltima(dado.cotacoes);

        let ultimaCotacaoMaior = ultimaCotacao.valorCotado > penultimaCotacao.valorCotado ? 1 :
            ultimaCotacao.valorCotado < penultimaCotacao.valorCotado ? 2 : 0;

        return {
            valorUltimaCotacao: ultimaCotacao.valorCotado,
            valorAnterior: penultimaCotacao.valorCotado,
            valorCotadoMaior: ultimaCotacaoMaior,
            dataUltimaCotacao: ultimaCotacao.dataRegistro
        }
    }

    return (
        <>
            {
                !dados.length ?
                    <div className='m-5'>
                        <Loading />
                    </div>
                    :
                    <div className="row">
                        {
                            dados.map(d => {

                                const { valorUltimaCotacao, valorCotadoMaior, valorAnterior, dataUltimaCotacao } = pegarUltimoValor(d)

                                return (
                                    <div className="col-lg-4 col-md-6 col-sm-12" key={d.id}>
                                        <Card className="moeda-card p-lg-2 p-md-2 mb-3">
                                            <header>
                                                <div className='mh-logo'>
                                                    <Image loader={customLoadImage} src={`${d.acronimo.toLowerCase()}-logo.png`} layout="responsive" height={50} width={50} />
                                                </div>
                                                <div className='mh-body'>
                                                    <h3>{d.nome}</h3>
                                                    <small>{d.acronimo}</small>
                                                </div>
                                            </header>
                                            <footer>
                                                <div className="m-value">
                                                    {valorCotadoMaior == 0 ? <FiMinus /> :
                                                        valorCotadoMaior == 1 ? <FiArrowUp /> :
                                                            valorCotadoMaior == 2 ? <FiArrowDown /> : null
                                                    }
                                                    <h2>{BrCurrency(valorUltimaCotacao)}</h2>
                                                </div>
                                                <div className='m-last-value'>
                                                    <small>{BrCurrency(valorAnterior)}</small>
                                                    <span className='m-data'>DATA COTAÇÃO: {dayjs(dataUltimaCotacao).utc().format('DD/MM/YYYY HH:mm')}</span>
                                                </div>
                                            </footer>
                                        </Card>
                                    </div>
                                )
                            })
                        }
                    </div>
            }
        </>
    )
}
