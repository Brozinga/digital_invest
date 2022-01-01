import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { danger } from '../../Alerts'

import NovaContaModel from '../../../models/NovaConta'

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

    const IncludesError = (name) => {
        if (errors.includes(name))
            return "error"

        return ""
    }

    const removeInputError = (campo) => {
        if (errors.length > 0)
            setErrors(errors.filter(e => e != campo))
    }


    const handleCPF = (e) => {
        setNovaConta({
            ...novaConta,
            cpf: cpfMask(e.target.value)
        })
        removeInputError("cpf")
    }


    const handleNovaConta = (e, campo) => {
        setNovaConta({
            ...novaConta,
            [campo]: e.target.value
        })
        removeInputError(campo)
    }

    const validarNovaConta = async (conta) => {
        try {
            await NovaContaModel.validate(novaConta, {
                abortEarly: false
            })

            return [];
        } catch (error) {
            return error.inner;
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const result = await validarNovaConta(novaConta)

        if (result.length > 0) {
            const ar = [];

            result.forEach(e => {
                danger(e.message)
                ar.push(e.path)
            })
            setErrors(ar)
        }
        console.log(errors)
    }


    return (
        <Form onSubmit={onSubmit} id="formCadastro">
            <Form.Group className={`mb-3 ${IncludesError("nome")}`} controlId="formCadastroNome">
                <Form.Label>Nome</Form.Label>
                <Form.Control value={novaConta.nome} onChange={e => handleNovaConta(e, "nome")} type="text" placeholder="Digite seu nome" />
            </Form.Group>
            <Form.Group className={`mb-3 ${errors.includes("email") ? "error" : ""}`} controlId="formCadastroEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control value={novaConta.email} onChange={e => handleNovaConta(e, "email")} type="email" placeholder="Digite um email válido" />
            </Form.Group>
            <Form.Group className={`mb-3 ${errors.includes("cpf") ? "error" : ""}`} controlId="formCadastroCPF">
                <Form.Label>CPF</Form.Label>
                <Form.Control value={novaConta.cpf} onChange={handleCPF} type="text" placeholder="Digite o seu CPF" />
            </Form.Group>
            <Form.Group className={`mb-3 ${errors.includes("senha") ? "error" : ""}`} controlId="formCadastroSenha">
                <Form.Label>Senha</Form.Label>
                <Form.Control value={novaConta.senha} onChange={e => handleNovaConta(e, "senha")} type="password" placeholder="Digite uma senha forte" />
            </Form.Group>
            <Form.Group className={`mb-3 ${errors.includes("confirmSenha") ? "error" : ""}`} controlId="formCadastroSenha">
                <Form.Label>Confirmação de Senha</Form.Label>
                <Form.Control value={novaConta.confirmSenha} onChange={e => handleNovaConta(e, "confirmSenha")} type="password" placeholder="Digite a mesma senha digitada acima" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Criar Conta
            </Button>
        </Form>
    )
}
