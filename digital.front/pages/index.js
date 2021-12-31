import Loading from "../components/Loading"
import { useEffect } from "react"

import { useRouter } from "next/router"

export default function Home() {
  const route = useRouter();

  useEffect(() => {
    route.push('/conta')
  }, [])

  return (
    <div className="background-color max-heigth loading-c">
      <Loading />
    </div>
  )
}
