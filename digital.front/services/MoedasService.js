import { httpClient } from "../utils"

export const PegarMoedasCall = async (token) => {
    try {
        let result = await httpClient(token).get(`${process.env.NEXT_PUBLIC_API_MOEDAS}`);

        return result.data;

    } catch (error) {
        if (error.response) {
            return {
                ...error.response.data,
                status: error.response.status
            };
        }
    }
}

export const PegarHistoricoMoedasCall = async (token, quantidade = 30) => {
    try {
        let result = await httpClient(token).get(`${process.env.NEXT_PUBLIC_API_MOEDAS_HISTORICO}/${quantidade}`);

        return result.data;

    } catch (error) {
        if (error.response) {
            return {
                ...error.response.data,
                status: error.response.status
            };
        }
    }
}