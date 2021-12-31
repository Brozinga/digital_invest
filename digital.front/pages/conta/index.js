import React, { useState } from 'react'
import { Tab, Tabs, Form, Button } from 'react-bootstrap'
import Card from '../../components/Card'
import Head from '../../components/Head'

import Image from 'next/image'

import logo from '../../public/logo-g-purple-to-blue.png'

export default function Conta() {
    const [key, setKey] = useState('login');


    return (
        <div className="container bg-center login-tab">
            <Head Title={"Digital Invest | Entrar"} />

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
                            <Button variant="primary" type="submit">
                                Entrar
                            </Button>
                        </Form>

                    </Tab>
                    <Tab eventKey="criar" title="Nova Conta">
                        <Form id="formCadastro">
                            <Form.Group className="mb-3" controlId="formCadastroEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Digite um email válido" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formCadastroEmail">
                                <Form.Label>CPF</Form.Label>
                                <Form.Control type="email" placeholder="Digite o seu CPF" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formCadastroSenha">
                                <Form.Label>Senha</Form.Label>
                                <Form.Control type="password" placeholder="Digite uma senha forte" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formCadastroSenha">
                                <Form.Label>Confirmação de Senha</Form.Label>
                                <Form.Control type="password" placeholder="Digite a mesma senha digitada acima" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Criar Conta
                            </Button>
                        </Form>

                    </Tab>
                </Tabs>
            </Card>
        </div>
    )
}
