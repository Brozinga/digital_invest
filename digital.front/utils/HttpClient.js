import axios from "axios"

const httpClient = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json"
    }
})

export {
    httpClient
}