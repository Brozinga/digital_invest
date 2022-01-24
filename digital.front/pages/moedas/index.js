import React, { useEffect, useContext, useState } from 'react'
import { Tab, Tabs, Accordion } from 'react-bootstrap'

import { AuthContext } from '../../contexts/AuthContext'

import { PegarMoedasCall } from '../../services/MoedasService'

import { LoadingCentalized } from "../../components/Loading"
import BasicLayout from "../../components/Layouts/BasicLayout"
import Card from "../../components/Card"
import { HttpResponseAlert, warning } from '../../components/Alerts'
import CardListagemMoedas from '../../components/#Pages/CardListagemMoedas'
import GraficosMoedas from '../../components/#Pages/GraficosMoedas/'
import ComprasMoedas from '../../components/#Pages/CompraMoedas'


export default function Moedas() {

    let IntervalUpdate = () => { }
    const { user, isAuthorized } = useContext(AuthContext)
    const [tabSelected, setTabSelected] = useState('moedas')

    const [data, setData] = useState([])

    const handleMoedas = async () => {
        if (user?.token) {
            let response = await PegarMoedasCall(user.token);
            if (response.status == 200 && Array.isArray(response?.result)) {
                setData(response.result)
            }
            if (response.status == 403) {
                warning("Ops! sua sessão expirou!")
                clearInterval(IntervalUpdate)
                isAuthorized()
            }
            else {
                HttpResponseAlert(response, false);
            }
        }
    }
    useEffect(() => {
        clearInterval(IntervalUpdate)
        isAuthorized()
    }, [])

    useEffect(async () => {
        await handleMoedas()
        IntervalUpdate = setInterval(async () => {
            await handleMoedas()
        }, [process.env.NEXT_PUBLIC_TEMPO_ATUALIZACAO])
    }, [user])

    return (
        <>
            {!user?.email || !data ?
                <LoadingCentalized /> :
                <main className="container">
                    <Card>
                        <Tabs
                            id="moedas-tab"
                            activeKey={tabSelected}
                            onSelect={(k) => setTabSelected(k)}
                            className="mb-3"
                        >
                            <Tab eventKey="moedas" title="Cotações">
                                <ComprasMoedas dados={data} user={user} />
                                <CardListagemMoedas dados={data} />
                            </Tab>
                            <Tab eventKey="evo-moedas" title="Evolução das Moedas">
                                <Accordion flush>
                                    {
                                        data.map((d, i) =>
                                            <GraficosMoedas indice={i} key={d.id} title={d.nome} dados={d} />
                                        )
                                    }
                                </Accordion>
                            </Tab>
                            <Tab eventKey="compras" title="Historico de Compras">
                            </Tab>
                        </Tabs>
                    </Card>
                </main>
            }
        </>
    )
}


Moedas.getLayout = function getLayout(page) {
    return (
        <BasicLayout title="Digital Invest | Moedas">
            {page}
        </BasicLayout>
    )
}