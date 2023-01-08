import React from 'react'
import Head from '../Head'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { Notifications } from '../Alerts'

export default function BasicLayout({ children, title, disabledNavbar = false, disabledFooter = false }) {
    return (
        <>
            <Head Title={title} />
            {disabledNavbar ? null : <Navbar />}
            <Notifications />
            {children}
            {disabledFooter ? null : <Footer />}
        </>
    )
}
