import React from 'react'
import { Card as CardBootstrap } from 'react-bootstrap'

export default function Card({ children, className }) {
    return (
         <CardBootstrap className={`bt-card ${className}`}>
            <CardBootstrap.Body>
            { children }
            </CardBootstrap.Body>
        </CardBootstrap>
    )
}
