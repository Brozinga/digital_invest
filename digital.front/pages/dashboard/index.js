import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

import { LoadingCentalized } from "../../components/Loading"

import LayoutWithNavbar from "../../components/Layouts/LayoutWithNavbar"
import Head from "../../components/Head"

export default function Dashboard() {

    const { user, isAuthorized } = useContext(AuthContext)

    useEffect(() => {
        isAuthorized()
    }, [])

    return (
        <>
            {!user?.nome ?
                <LoadingCentalized /> :
                <>
                    <Head Title="Digital Invest | Dashboard" />
                </>
            }
        </>
    )
}

Dashboard.getLayout = function getLayout(page) {
    return (
        <LayoutWithNavbar>
            {page}
        </LayoutWithNavbar>
    )
}