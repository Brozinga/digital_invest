const axios = require('axios')

const ApiBase = axios.create({
    baseURL: process.env.API_MOEDAS_BASE
})

const BuscarTicker = acronimo => {
    return ApiBase.get(`${acronimo}/ticker/`)
}

module.exports = {
    ApiBase,
    BuscarTicker

};