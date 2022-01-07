import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

import { LoadingCentalized } from "../../components/Loading"

import BasicLayout from "../../components/Layouts/BasicLayout"
import { BrCurrency } from "../../utils"

import Card from "../../components/Card"
import Grafico from '../../components/#Pages/Grafico'

export default function Dashboard() {

    const { user, isAuthorized } = useContext(AuthContext)

    useEffect(() => {
        isAuthorized()
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
                                    <p>{BrCurrency(user.carteira)}</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Card className="card-history col-md-12 mt-4">
                        <div className="col-md-12 hystory-title p-lg-3">
                            <h3>
                                Histórico da Carteira
                            </h3>
                            {/* <hr/> */}
                        </div>
                        <div className="history-chart">
                            <Grafico user={user} />
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