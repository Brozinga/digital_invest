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

export const TodosPedidosCall = async (token, quantidade = 0) => {
    try {
        let result = await httpClient(token).get(`${process.env.NEXT_PUBLIC_API_TODOS_PEDIDO}/${quantidade}`);

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

export const CancelarPedidoCall = async (token, id) => {
    try {
        let result = await httpClient(token).delete(`${process.env.NEXT_PUBLIC_API_CANCELAR_PEDIDO}/${id}`);

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