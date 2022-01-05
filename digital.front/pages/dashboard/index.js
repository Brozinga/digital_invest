import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

import { LoadingCentalized } from "../../components/Loading"

import BasicLayout from "../../components/Layouts/BasicLayout"
import { BrCurrency } from "../../utils"

import Card from "../../components/Card"

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