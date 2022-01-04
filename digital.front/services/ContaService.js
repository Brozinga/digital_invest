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
            return error.response.data;
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
        } else if (error.request) {
            // console.log(error.request);
        }
    }
}

export const LoginCall = async ({ email, senha }) => {
    try {
        let result = await httpClient.post(process.env.NEXT_PUBLIC_API_CONTA_LOGIN, {
            email,
            senha
        });

        return result.data;

    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
}