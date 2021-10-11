const mongoose = require("mongoose");
const moedasSchema = require("../Models/Moedas");
const cotacoesSchema = require("../Models/Cotacoes");
const usuariosSchema = require("../Models/Usuarios");
const pedidosSchema = require("../Models/Pedidos");

const connection = mongoose.createConnection(process.env.BANCO_DADOS,
    {
        useNewUrlParser: true,
        dbName: "DigitalInvest"
    })

const Connection = connection;
const MoedasRepository = connection.model("moedas", moedasSchema);
const CotacoesRepository = connection.model("cotacoes", cotacoesSchema);
const UsuariosRepository = connection.model("usuarios", usuariosSchema);
const PedidosRepository = connection.model("pedidos", pedidosSchema);

let item = MoedasRepository.find({});


module.exports = {
    Connection,
    MoedasRepository,
    CotacoesRepository,
    UsuariosRepository,
    PedidosRepository
}
