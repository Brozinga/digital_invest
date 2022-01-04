import React, { useEffect, useContext } from 'react'

import { AuthContext } from '../../contexts/AuthContext'

import { LoadingCentalized } from "../../components/Loading"

import BasicLayout from "../../components/Layouts/BasicLayout"


export default function Compra() {

    const { user, isAuthorized } = useContext(AuthContext)

    useEffect(() => {
        isAuthorized()
    }, [])

    return (
        <>
            {!user?.email ?
                <LoadingCentalized /> :
                <>
                </>
            }
        </>
    )
}


Compra.getLayout = function getLayout(page) {
    return (
        <BasicLayout title="Digital Invest | Compra de Moedas">
            {page}
        </BasicLayout>
    )
}