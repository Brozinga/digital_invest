const mongoose = require("mongoose");
const moedasSchema = require("../../../digital.domain/src/Models/Moedas");
const cotacoesSchema = require("../../../digital.domain/src/Models/Cotacao");

const connection = mongoose.createConnection(process.env.BANCO_DADOS,
    {
        useNewUrlParser: true,
        dbName: "DigitalInvest"
    })

const Connection = connection;
const MoedasRepository = connection.model("moedas", moedasSchema);
const CotacoesRepository = connection.model("cotacoes", cotacoesSchema);

module.exports = {
    Connection,
    MoedasRepository,
    CotacoesRepository
}
