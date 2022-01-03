import { LoadingCentalized } from "../components/Loading"
import { useEffect } from "react"

import { useRouter } from "next/router"

export default function Home() {
  const route = useRouter();

  useEffect(() => {
    route.push('/conta')
  }, [])

  return (
    <LoadingCentalized />
  )
}