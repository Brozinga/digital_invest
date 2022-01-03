import React, { useContext, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { RiLogoutCircleRLine } from "react-icons/ri"

import { AuthContext } from '../../contexts/AuthContext'

import { Navbar as NavbarBootstrap, Container, Nav } from 'react-bootstrap'

import logo from "../../assets/images/logo-black-50px.png"

import Dialog from '../Dialog'

export default function Navbar() {
    const router = useRouter()

    const { user, Logoff } = useContext(AuthContext)
    const [show, setShow] = useState(false);

    const activeRoute = (path) => {
        if (router.pathname == path) {
            return "active"
        }
        return null;
    }

    const handleModalNo = () => {
        setShow(false)
    }

    const handleModalYes = () => {
        setShow(false)
        Logoff()
    }

    return (
        <>
            <Dialog
                title={"Ops! Você está saindo!"}
                message={"Você tem certeza que deseja deslogar?"}
                show={show}
                setShow={setShow}
                handleYes={handleModalYes}
                handleNot={handleModalNo}
                yesText={"Sim"}
                noText={"Não"}
            />
            {
                user?.nome ? <NavbarBootstrap bg="light" expand="lg">
                    <Container>
                        <NavbarBootstrap.Brand href="#home">
                            <div className="navbar-logo">
                                <Image src={logo} width={35} height={39} />
                            </div>
                        </NavbarBootstrap.Brand>
                        <NavbarBootstrap.Toggle aria-controls="basic-navbar-nav" />
                        <NavbarBootstrap.Collapse id="basic-navbar-nav">
                            <br />
                            <Nav className="me-auto">
                                <Link href="/dashboard">
                                    <Nav.Link href="/dashboard" className={activeRoute("/dashboard")}>Dashboard</Nav.Link>
                                </Link>
                                <Link href="/compras">
                                    <Nav.Link href="/compras" className={activeRoute("/compras")}>Compra de Moedas</Nav.Link>
                                </Link>
                            </Nav>
                            <Nav className="user-nav-container">
                                <hr />
                                <Nav.Link onClick={() => setShow(true)} className="user-nav">{user.email}<RiLogoutCircleRLine fontSize={30} /></Nav.Link>
                            </Nav>
                        </NavbarBootstrap.Collapse>
                    </Container>
                </NavbarBootstrap> : null}
        </>
    )
}
