import React from 'react'
import { Card as CardBootstrap } from 'react-bootstrap'

export default function Card({ children }) {
    return (
        <CardBootstrap className="bt-card">
            <CardBootstrap.Body>
            { children }
            </CardBootstrap.Body>
        </CardBootstrap>
    )
}
