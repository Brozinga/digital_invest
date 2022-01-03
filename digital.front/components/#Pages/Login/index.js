import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { Form, Button } from 'react-bootstrap'

import { InputAddClassNameErro } from "../../../utils"

import { LoginValidate } from "../../../models/LoginModel"

import { HttpResponseAlert, danger, notify } from '../../../components/Alerts'

import { AuthContext } from '../../../contexts/AuthContext'

export default function Login({ login, setLogin }) {

    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false);
    const { IfErrorList, RemoveErrors, AddErrosArray } = InputAddClassNameErro(errors, setErrors)
    const { signIn, routerContext } = useContext(AuthContext)

    const handleInformationLogin = (e, campo) => {
        setLogin({
            ...login,
            [campo]: e.target.value
        })
        RemoveErrors(campo)
    }

    const getLoginToken = async (login) => {
        setLoading(true)
        let response = await signIn(login)

        if (!response.success) {
            HttpResponseAlert(response, false)
            setLoading(false)
        } else {
            notify.remove();
            routerContext.push("/dashboard")
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const result = await LoginValidate(login)

        if (result.length > 0) {
            const paths = [];
            const messagesErros = [];

            result.forEach(e => {
                messagesErros.push(e.message)
                paths.push(e.path)
            })
            danger(messagesErros)
            AddErrosArray(paths)
        }
        else {
            await getLoginToken(login)
        }
    }

    return (
        <Form id="formLogin" onSubmit={onSubmit}>
            <Form.Group className={`mb-3 ${IfErrorList("email")}`} controlId="formLoginEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control value={login.email} onChange={e => handleInformationLogin(e, "email")} type="text" placeholder="Digite o email" />
            </Form.Group>
            <Form.Group className={`mb-3 ${IfErrorList("senha")}`} controlId="formLoginSenha">
                <Form.Label>Senha</Form.Label>
                <Form.Control value={login.senha} onChange={e => handleInformationLogin(e, "senha")} type="password" placeholder="Digite a senha" />
            </Form.Group>
            <Button disabled={loading} variant="primary" type="submit">
                {loading ? "Carregando" : "Entrar"}
            </Button>
        </Form>
    )
}
