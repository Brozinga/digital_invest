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
    token: ""
}

const AuthContextIntialData = {
    signIn: function ({ email, senha }) { return userIntialData },
    routerContext: [],
    deleteAuthCookie: () => { },
    getAuthCookie: (name) => { },
    isAutenticated: () => false,
    isAuthorized: () => { }
}

export const AuthContext = createContext(AuthContextIntialData);

export function AuthProvider({ children }) {

    const routerContext = useRouter();

    const [user, setUser] = useState(userIntialData);

    const setAuthCookie = (data) => {
        SaveEncryptLocalStorage(data, "@digital-data")
    }

    const signIn = async ({ email, senha }) => {
        const response = await LoginCall({ email, senha });
        setUser(response?.result);
        if (response.result?.token)
            setAuthCookie(response.result)

        return response;
    }

    const getAuthCookie = () => {
        return GetEncryptLocalStorage("@digital-data")
    }

    const deleteAuthCookie = () => {
        RemoveEncryptLocalStorage("@digital-data")
    }

    const isAuthenticated = () => {
        const cookie = getCookie();

        if (user.token && cookie) {
            return true;
        }

        return false;
    }

    const isAuthorized = () => {
        if (!isAuthenticated()) {
            routerContext.push("/conta")
        }
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            signIn,
            routerContext,
            getAuthCookie,
            deleteAuthCookie,
            isAuthorized
        }}>
            {children}
        </AuthContext.Provider>
    )
}