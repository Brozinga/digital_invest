import axios from "axios"

export const httpClient = (token = null) => {

    let tokenString = {};
    if (token) {
        tokenString = {
            "Authorization": `Bearer ${token}`
        }
    }

    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
        headers: {
            "Content-Type": "application/json",
            ...tokenString
        }
    })
}