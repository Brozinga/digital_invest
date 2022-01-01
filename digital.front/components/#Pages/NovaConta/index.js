import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { danger } from '../../Alerts'

import { NovaContaValidate } from '../../../models/NovaContaModel'

import { InputAddClassNameErro } from "../../../utils"

const cpfMask = value => {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1')
}

export default function NovaConta({ novaConta, setNovaConta, onSubmitNovaConta }) {

    const [errors, setErrors] = useState([])
    const { IfErrorList, RemoveErrors, AddErrosArray } = InputAddClassNameErro(errors, setErrors)

    const handleCPF = (e) => {
        setNovaConta({
            ...novaConta,
            cpf: cpfMask(e.target.value)
        })
        RemoveErrors("cpf")
    }


    const handleNovaConta = (e, campo) => {
        setNovaConta({
            ...novaConta,
            [campo]: e.target.value
        })
        RemoveErrors(campo)
    }

    const ErrosView = (message) => {
        return <p>{message}</p>
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const result = await NovaContaValidate(novaConta)

        if (result.length > 0) {
            const paths = [];
            let textoErrors = [];

            result.forEach(e => {
                textoErrors.push(e.message);
                paths.push(e.path)
            })

            danger(textoErrors)
            AddErrosArray(paths)
        }
    }



    return (
        <Form onSubmit={onSubmit} id="formCadastro">
            <Form.Group className={`mb-3 ${IfErrorList("nome")}`} controlId="formCadastroNome">
                <Form.Label>Nome</Form.Label>
                <Form.Control value={novaConta.nome} onChange={e => handleNovaConta(e, "nome")} type="text" placeholder="Digite seu nome" />
            </Form.Group>
            <Form.Group className={`mb-3 ${IfErrorList("email")}`} controlId="formCadastroEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control value={novaConta.email} onChange={e => handleNovaConta(e, "email")} type="text" placeholder="Digite um email válido" />
            </Form.Group>
            <Form.Group className={`mb-3 ${IfErrorList("cpf")}`} controlId="formCadastroCPF">
                <Form.Label>CPF</Form.Label>
                <Form.Control value={novaConta.cpf} onChange={handleCPF} type="text" placeholder="Digite o seu CPF" />
            </Form.Group>
            <Form.Group className={`mb-3 ${IfErrorList("senha")}`} controlId="formCadastroSenha">
                <Form.Label>Senha</Form.Label>
                <Form.Control value={novaConta.senha} onChange={e => handleNovaConta(e, "senha")} type="password" placeholder="Digite uma senha forte" />
            </Form.Group>
            <Form.Group className={`mb-3 ${IfErrorList("confirmSenha")}`} controlId="formCadastroConfirmSenha">
                <Form.Label>Confirmação de Senha</Form.Label>
                <Form.Control value={novaConta.confirmSenha} onChange={e => handleNovaConta(e, "confirmSenha")} type="password" placeholder="Digite a mesma senha digitada acima" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Criar Conta
            </Button>
        </Form>
    )
}
