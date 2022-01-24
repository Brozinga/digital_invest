import { httpClient } from "../utils"

export const EnviarPedidoCall = async (token, payload) => {
    try {
        let result = await httpClient(token).post(`${process.env.NEXT_PUBLIC_API_NOVO_PEDIDO}`, {
            ...payload
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