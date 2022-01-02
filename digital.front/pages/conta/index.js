import React, { useState, useContext } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import Card from '../../components/Card'
import Head from '../../components/Head'

import NovaConta from '../../components/#Pages/NovaConta'
import Login from '../../components/#Pages/Login'

import Image from 'next/image'

import logo from '../../public/logo-g-purple-to-blue.png'

import { Notifications, HttpResponseAlert } from '../../components/Alerts'

import { AuthContext } from '../../contexts/AuthContext'

import { NovaContaCall } from "../../services/ContaService"

export default function Conta() {
    const [key, setKey] = useState('login');

    const { signIn, routerContext, deleteAuthCookie, getAuthCookie } = useContext(AuthContext)

    const loginModel = {
        email: "",
        senha: ""
    };

    const novaContaModel = {
        nome: "",
        email: "",
        cpf: "",
        senha: "",
        confirmSenha: "",
    }

    const [login, setLogin] = useState(loginModel)
    const [novaConta, setNovaConta] = useState(novaContaModel)

    const handleLogin = async (login) => {
        const response = await signIn(login)
        HttpResponseAlert(response, false)
    }

    const handleNovaConta = async (novaConta) => {
        const response = await NovaContaCall(novaConta)
        HttpResponseAlert(response)

        if (response.status == 200) {
            setNovaConta(novaContaModel)
            setKey("login")
        }
    }

    return (
        <div className="container bg-center login-tab">
            <Head Title={"Digital Invest | Entrar"} />
            <Notifications />

            <div className="logo">
                <div className="logo-container">
                    <Image src={logo} layout='responsive' />
                </div>
                <div>
                    <h2>
                        Digital Invest
                    </h2>
                </div>
            </div>
            <Card className="col-sm-12">
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                >
                    <Tab eventKey="login" title="Entrar">
                        <Login login={login} setLogin={setLogin} onSubmitLogin={handleLogin} />
                    </Tab>
                    <Tab eventKey="criar" title="Nova Conta">
                        <NovaConta novaConta={novaConta} setNovaConta={setNovaConta} onSubmitNovaConta={handleNovaConta} />
                    </Tab>
                </Tabs>
            </Card>
        </div>
    )
}
