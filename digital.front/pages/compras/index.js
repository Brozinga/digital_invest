import React, { useEffect, useContext } from 'react'
import dynamic from 'next/dynamic'

import { AuthContext } from '../../contexts/AuthContext'

import { LoadingCentalized } from "../../components/Loading"
import Head from '../../components/Head'

import LayoutWithNavbar from "../../components/Layouts/LayoutWithNavbar"


export default function Compra() {

    const { user, isAuthorized } = useContext(AuthContext)

    useEffect(() => {
        isAuthorized()
    }, [])

    return (
        <>
            {!user?.nome ?
                <LoadingCentalized /> :
                <>
                    <Head Title={"Digital Invest | Compra de Moedas"} />
                </>
            }
        </>
    )
}


Compra.getLayout = function getLayout(page) {
    return (
        <LayoutWithNavbar>
            {page}
        </LayoutWithNavbar>
    )
}