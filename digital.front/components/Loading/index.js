import React from 'react'

export default function Loading() {
    return (
        <div className="loading-container">
            <div className="sk-chase">
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
            </div>
            <p>
                Carregado
            </p>
        </div>
    )
}

export function LoadingCentalized() {
    return (
        <div className='background-color full-screen'>
            <Loading />
        </div>
    )
}
