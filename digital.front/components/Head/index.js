import React from 'react'
import { default as HeadNext } from 'next/head'

export default function Head({ Title }) {
    return (
        <HeadNext>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;600;700;800&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;600;800&display=swap" rel="stylesheet" />
            <title>{Title}</title>
        </HeadNext>
    )
}
