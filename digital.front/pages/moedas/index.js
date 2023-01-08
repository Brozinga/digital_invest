import React, { useEffect, useContext, useState } from 'react'
import { Tab, Tabs, Accordion } from 'react-bootstrap'
import { FiAlertCircle } from "react-icons/fi"

import { AuthContext } from '../../contexts/AuthContext'

import { PegarHistoricoMoedasCall } from '../../services/MoedasService'
import { TodosPedidosCall, CancelarPedidoCall } from '../../services/PedidoService'

import { LoadingCentalized } from "../../components/Loading"
import BasicLayout from "../../components/Layouts/BasicLayout"
import Card from "../../components/Card"
import { HttpResponseAlert, warning, success } from '../../components/Alerts'
import CardListagemMoedas from '../../components/#Pages/CardListagemMoedas'
import GraficosMoedas from '../../components/#Pages/GraficosMoedas/'
import ComprasMoedas from '../../components/#Pages/CompraMoedas'

import HistoricoComprasTable from '../../components/#Pages/HistoricoComprasTable'


export default function Moedas() {

    let IntervalUpdate = () => { }
    const { user, isAuthorized, addUpdateFunction } = useContext(AuthContext)
    const [tabSelected, setTabSelected] = useState('moedas')

    const [data, setData] = useState([])
    const [pedidos, setPedidos] = useState([])

    const handleMoedas = async () => {
        if (user?.token) {
            let response = await PegarHistoricoMoedasCall(user.token);
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

    const handlerSelectTab = async (event) => {
        if (event == "compras")
            await handleHistoricoPedidos()

        setTabSelected(event)
    }

    const handleHistoricoPedidos = async () => {
        if (user?.token) {
            let response = await TodosPedidosCall(user.token);
            if (response.status == 200 && Array.isArray(response?.result?.listaCompras)) {
                setPedidos(response.result.listaCompras)
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


    const handleDelete = async (cancelamento) => {
        let response = await CancelarPedidoCall(user.token, cancelamento.id);
        if (response.status == 200) {
            success(`Pedido cancelado com sucesso!`)
            await handleHistoricoPedidos();
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

    useEffect(() => {
        clearInterval(IntervalUpdate)
        isAuthorized()
    }, [])

    useEffect(() => {
        async function Load() {
            await handleMoedas()
            addUpdateFunction(handleHistoricoPedidos)
            IntervalUpdate = setInterval(async () => {
            console.log("atualizacao de moedas")
            await handleMoedas()
        }, [process.env.NEXT_PUBLIC_TEMPO_ATUALIZACAO])
        }

        Load()
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
                            onSelect={(k) => handlerSelectTab(k)}
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
                                {
                                    pedidos.length ? <>
                                        <HistoricoComprasTable pedidos={pedidos} HandlerCancelamento={handleDelete} />
                                    </> :
                                        <div className="text-center no-history">
                                            <FiAlertCircle />
                                            <h3>Você ainda não possui pedidos</h3>
                                        </div>
                                }
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