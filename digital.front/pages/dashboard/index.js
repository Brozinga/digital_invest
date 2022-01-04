import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

import { LoadingCentalized } from "../../components/Loading"

import BasicLayout from "../../components/Layouts/BasicLayout"

export default function Dashboard() {

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

Dashboard.getLayout = function getLayout(page) {
    return (
        <BasicLayout title="Digital Invest | Dashboard">
            {page}
        </BasicLayout>
    )
}