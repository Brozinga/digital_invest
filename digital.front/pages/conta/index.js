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
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>
                        </Form>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Tab>
                    <Tab eventKey="criar" title="Nova Conta">
                        <p>
                            So am I as the rich, whose blessed key, Can bring him to his sweet up-locked treasure, The which he will not every hour survey, For blunting the fine point of seldom pleasure. Therefore are feasts so solemn and so rare, Since, seldom coming in that long year set, Like stones of worth they thinly placed are, Or captain jewels in the carcanet. So is the time that keeps you as my chest, Or as the wardrobe which the robe doth hide,
                        </p>
                    </Tab>
                </Tabs>
            </Card>
        </div>
    )
}
