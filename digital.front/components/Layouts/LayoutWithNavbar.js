import React from 'react'
import Navbar from '../Navbar'

export default function LayoutWithNavbar({ children }) {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}
