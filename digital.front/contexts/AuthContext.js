import { createContext, useState, useEffect } from "react"
import { useRouter } from "next/router"
import {
    JwtRead,
    SaveEncryptLocalStorage,
    GetEncryptLocalStorage,
    RemoveEncryptLocalStorage
} from "../utils"
import { LoginCall } from "../services/ContaService"
import useWebSocket from 'react-use-websocket'

const userIntialData = {
    id: "",
    nome: "",
    carteira: 0,
    email: "",
    token: "",
    dataExpiracao: ""
}

let userCustom = { ... userIntialData };

const AuthContextIntialData = {
    signIn: function ({ email, senha }) { return userIntialData },
    routerContext: [],
    deleteAuthCookie: () => { },
    getAuthCookie: (name) => { },
    isAutenticated: () => false,
    isAuthorized: () => { },
    Logoff: () => { },
    getUser: () => userIntialData,
    saldo: 0.00,
    setSaldo: () => saldo,
    addUpdateFunction: () => {},
    user: userIntialData
}

export const AuthContext = createContext(AuthContextIntialData);

export function AuthProvider({ children }) {

    const [user, setUser] = useState({ ...userIntialData })
    const [updateFunction, setUpdateFunction] = useState([])
    const [saldo, setSaldo] = useState(0.00)
    const [socketUrl, setSocketUrl] = useState(`${process.env.NEXT_PUBLIC_WEB_SOCKET_URL_BASE}`);

    const { lastMessage } = useWebSocket(socketUrl,{
        onOpen: () => console.log(`Connected to App WS`),
    });

    useEffect(() => {
       async function Load() {
        if (lastMessage !== null) {
            for (let func of updateFunction) {
                await func()
            }
        }
       }
       Load();
    }, [lastMessage])

    useEffect(() => {
        let userLocal = getUser()
        setUser(userLocal)
        if (userLocal?.id)
            setSocketUrl(`${process.env.NEXT_PUBLIC_WEB_SOCKET_URL_BASE}?id=${userLocal?.id}`)
    }, [user])

    const routerContext = useRouter();

    const setAuthCookie = (data) => {
        SaveEncryptLocalStorage(data, process.env.NEXT_PUBLIC_AUTHCONTEXT_DATA_NAME)
    }

    const addUpdateFunction = (newUpdateFunction) => {
        setUpdateFunction([...updateFunction, newUpdateFunction])
    }

    const signIn = async ({ email, senha }) => {
        const response = await LoginCall({ email, senha });
        if (response.result?.token) {
            setUser({ ...response.result })
            setAuthCookie(response.result)
        }
        return response;
    }

    const getAuthCookie = () => {
        return GetEncryptLocalStorage(process.env.NEXT_PUBLIC_AUTHCONTEXT_DATA_NAME)
    }

    const deleteAuthCookie = () => {
        RemoveEncryptLocalStorage(process.env.NEXT_PUBLIC_AUTHCONTEXT_DATA_NAME)
        setUser({ ...userIntialData })
    }

    const isAuthenticated = () => {
        const cookie = getAuthCookie();

        if (!cookie || !cookie?.dataExpiracao || !cookie?.token) {
            deleteAuthCookie()
            return false;
        }

        let tokenExpirationDate = new Date(cookie.dataExpiracao).getTime() / 1000;
        let currentDate = new Date().getTime() / 1000;

        console.log('TOKEN_EXP ', tokenExpirationDate)
        console.log('CURRENT ', currentDate)
        console.log('TOKEN IS GREAT CURRENT ', tokenExpirationDate > currentDate)

        if (tokenExpirationDate < currentDate) {
            deleteAuthCookie()
            return false;
        }

        if (cookie.token && tokenExpirationDate >= currentDate) {
            setUser({ ...cookie })
            return true;
        }

        return false;
    }

    const isAuthorized = () => {
        if (!isAuthenticated()) {
            routerContext.push(process.env.NEXT_PUBLIC_REDIRECT_LOGIN_PATH)
        }
    }

    const Logoff = () => {
        deleteAuthCookie()
        routerContext.push(process.env.NEXT_PUBLIC_REDIRECT_LOGIN_PATH)
    }

    const getUser = () => {
        if (!user?.token) {

            let userItem = getAuthCookie();

            if (!userItem?.token) {
                routerContext.push(process.env.NEXT_PUBLIC_REDIRECT_LOGIN_PATH)
                return null;
            } else {
                return userItem;
            }

        } else {
            return user;
        }
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            signIn,
            routerContext,
            getAuthCookie,
            deleteAuthCookie,
            isAuthorized,
            Logoff,
            getUser,
            setUser,
            saldo,
            setSaldo,
            addUpdateFunction,
            user
        }}>
            {children}
        </AuthContext.Provider>
    )
}