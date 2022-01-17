import { createContext, useState, useEffect } from "react"
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
    user: userIntialData
}

export const AuthContext = createContext(AuthContextIntialData);

export function AuthProvider({ children }) {

    const [user, setUser] = useState({ ...userIntialData })

    useEffect(() => {
        setUser(getUser())
    }, [])

    const routerContext = useRouter();

    const setAuthCookie = (data) => {
        SaveEncryptLocalStorage(data, process.env.NEXT_PUBLIC_AUTHCONTEXT_DATA_NAME)
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
            user = { ...cookie }
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
            console.log("USUARIO", user);
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
            user
        }}>
            {children}
        </AuthContext.Provider>
    )
}