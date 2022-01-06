import { httpClient } from "../utils"

export const NovaContaCall = async ({ nome, email, cpf, senha }) => {
    try {
        let result = await httpClient.post(process.env.NEXT_PUBLIC_API_CONTA_NOVA, {
            nome,
            email,
            cpf,
            senha
        });
        return result.data;

    } catch (error) {
        if (error.response) {
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
            return {
                ...error.response.data,
                status: error.response.status
            };
        } else if (error.request) {
            // console.log(error.request);
        }
    }
}

export const LoginCall = async ({ email, senha }) => {
    try {
        let result = await httpClient().post(process.env.NEXT_PUBLIC_API_CONTA_LOGIN, {
            email,
            senha
        });

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

export const HistoricoCarteiraCall = async (token) => {
    try {
        let result = await httpClient(token).get(`${process.env.NEXT_PUBLIC_API_HISTORICO_CARTEIRA}`);

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