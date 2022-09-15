import React, { useContext, useEffect, useState, useCallback } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

import { LoadingCentalized } from "../../components/Loading"
import BasicLayout from "../../components/Layouts/BasicLayout"
import { HistoricoCarteiraCall, SaldoCarteiraCall } from '../../services/ContaService'

import { BrCurrency } from "../../utils"

import Card from "../../components/Card"
import Grafico from '../../components/#Pages/Grafico'

export default function Dashboard() {

    const { user, getUser, isAuthorized, setSaldo, saldo, addUpdateFunction } = useContext(AuthContext)
    const [dataGrafico, setDataGrafico] = useState([]);
    const UpdateCarteira = async () => {
        let userLocal = getUser()
        if (userLocal?.token) {
            const responseHistorico = await HistoricoCarteiraCall(userLocal.token);
            const responseSaldo = await SaldoCarteiraCall(userLocal.token);

            if (responseSaldo && responseSaldo?.result) {
                setSaldo(responseSaldo?.result?.carteira || 0.00)
            }

            if (responseHistorico && responseHistorico?.result) {
                setDataGrafico(responseHistorico?.result)
            }
        }
    }


    useEffect(async () => {
        isAuthorized()
        await UpdateCarteira()
        addUpdateFunction(UpdateCarteira)
    }, [])


    return (
        <>
            {!user?.email ?
                <LoadingCentalized /> :
                <main className='container dashboard'>
                    <Card className="card-currency col-md-12">
                        <div className="currency-container">
                            <div className="currency-user">
                                <h4 className='currency-title'>Bem-Vindo(a)!</h4>
                                <h3 className='currency-title'>{user.nome}</h3>
                            </div>
                            <hr />
                            <div className="currency">
                                <span className='currency-title'>Valor na Carteira</span>
                                <div className="currency-value">
                                    <p>{BrCurrency(saldo)}</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card className="card-history col-md-12 mt-4">
                        <div className="col-md-12 hystory-title p-lg-3">
                            <h3>
                                Histórico da Carteira
                            </h3>
                        </div>
                        <div className="history-chart">
                            <Grafico dadosGrafico={dataGrafico} setDadosGrafico={setDataGrafico} />
                        </div>
                    </Card>
                </main>
            }
        </>
    )
}

Dashboard.getLayout = function getLayout(page) {
    return (
        <BasicLayout title="Digital Invest | Dashboard">
            {page}
        </BasicLayout>
    )
}