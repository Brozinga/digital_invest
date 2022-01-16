import "react-datepicker/dist/react-datepicker.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'
import { AuthProvider } from '../contexts/AuthContext'


function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <div id="__app" suppressHydrationWarning>
      {typeof window === 'undefined' ? null :
        <AuthProvider>
          {getLayout(<Component {...pageProps} />)}
        </AuthProvider>
      }
    </div>
  )
}

export default MyApp
