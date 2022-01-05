import { LoadingCentalized } from "../components/Loading"
import { useEffect } from "react"

import { useRouter } from "next/router"
import Head from '../components/Head'

export default function Home() {
  const route = useRouter();

  useEffect(() => {
    route.push('/conta')
  }, [])

  return (
    <>
      <Head Title="Digital Invest | Entrar"/>
      <LoadingCentalized />
    </>
  )
}