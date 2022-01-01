import React, { useState } from 'react'
import { Tab, Tabs, Form, Button } from 'react-bootstrap'
import Card from '../../components/Card'
import Head from '../../components/Head'

import NovaConta from '../../components/#Pages/NovaConta'

import Image from 'next/image'

import logo from '../../public/logo-g-purple-to-blue.png'

import { Notifications, warning, danger } from '../../components/Alerts'


export default function Conta() {
    const [key, setKey] = useState('login');

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
                        <Form id="formLogin">
                            <Form.Group className="mb-3" controlId="formLoginEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Digite o email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formLoginSenha">
                                <Form.Label>Senha</Form.Label>
                                <Form.Control type="password" placeholder="Digite a senha" />
                            </Form.Group>
                            <Button variant="primary" type="button">
                                Entrar
                            </Button>
                        </Form>

                    </Tab>
                    <Tab eventKey="criar" title="Nova Conta">
                        <NovaConta novaConta={novaConta} setNovaConta={setNovaConta} />
                    </Tab>
                </Tabs>
            </Card>
        </div>
    )
}
