import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import { Tab, Tabs } from 'react-bootstrap'

import Card from '../../components/Card'
import NovaConta from '../../components/#Pages/NovaConta'
import Login from '../../components/#Pages/Login'

import BasicLayout from "../../components/Layouts/BasicLayout"

import logo from '../../public/logos/logo-g-purple-to-blue.png'


export default function Conta() {

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

    const [key, setKey] = useState('login')
    const [login, setLogin] = useState(loginModel)
    const [novaConta, setNovaConta] = useState(novaContaModel)

    return (
        <main className='conta'>
            <div className="container bg-center login-tab">
                <div className="logo">
                    <div className="logo-container">
                        <Image src={logo} layout='responsive' width={90} height={102} />
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
                            <Login login={login} setLogin={setLogin} />
                        </Tab>
                        <Tab eventKey="criar" title="Nova Conta">
                            <NovaConta novaConta={novaConta} resetNovaConta={novaContaModel}
                                setTabLogin={setKey} setNovaConta={setNovaConta} />
                        </Tab>
                    </Tabs>
                </Card>
            </div>
        </main>
    )
}

Conta.getLayout = function getLayout(page) {
    return (
        <BasicLayout disabledNavbar title="Digital Invest | Entrar">
            {page}
        </BasicLayout>
    )
}