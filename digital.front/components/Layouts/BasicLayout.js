import React from 'react'
import Head from '../Head'
import Navbar from '../Navbar'
import { Notifications } from '../Alerts'

export default function BasicLayout({ children, title, disabledNavbar = false }) {
    return (
        <>
            <Head Title={title} />
            {disabledNavbar ? null : <Navbar />}
            <Notifications />
            {children}
        </>
    )
}
