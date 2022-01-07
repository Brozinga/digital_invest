import { createContext, useState } from "react"
import { useRouter } from "next/router"
import {
    JwtRead,
    SaveEncryptLocalStorage,
    GetEncryptLocalStorage,
    RemoveEncryptLocalStorage
} from "../utils"
import { LoginCall } from "../services/ContaService"


const userIntialData = {
    nome: "",
    carteira: 0,
    email: "",
    token: "",
    dataExpiracao: ""
}

const AuthContextIntialData = {
    signIn: function ({ email, senha }) { return userIntialData },
    routerContext: [],
    deleteAuthCookie: () => { },
    getAuthCookie: (name) => { },
    isAutenticated: () => false,
    isAuthorized: () => { },
    Logoff: () => { },
    user: userIntialData
}

export const AuthContext = createContext(AuthContextIntialData);

export function AuthProvider({ children }) {

    const [user, setUser] = useState(userIntialData)


    const routerContext = useRouter();

    const setAuthCookie = (data) => {
        SaveEncryptLocalStorage(data, process.env.NEXT_PUBLIC_AUTHCONTEXT_DATA_NAME)
    }

    const signIn = async ({ email, senha }) => {
        const response = await LoginCall({ email, senha });
        if (response.result?.token) {
            setUser(response.result)
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

        if (cookie.token && tokenExpirationDate > currentDate) {
            setUser(cookie)
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

    const UserValidation = () => {
        if (isAuthorized()) {
            return user;
        } else {
            return null;
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
            user
        }}>
            {children}
        </AuthContext.Provider>
    )
}