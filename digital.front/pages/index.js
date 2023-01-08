import { LoadingCentalized } from "../components/Loading"
import React, { useEffect, useContext } from "react"

import Head from '../components/Head'

import { AuthContext } from '../contexts/AuthContext'

export default function Home() {

  const { routerContext } = useContext(AuthContext)


  useEffect(() => {
    routerContext.push('/conta')
  }, [])

  return (
    <>
      <Head Title="Digital Invest | Entrar"/>
      <LoadingCentalized />
    </>
  )
}