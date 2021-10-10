const mongoose = require("mongoose");
const moedaSchema = require("../Models/Moeda");
const cotacaoSchema = require("../Models/Cotacao");
const usuarioSchema = require("../Models/Usuario");
const pedidoSchema = require("../Models/Pedido");

const connection = mongoose.createConnection(process.env.BANCO_DADOS,
    {
        useNewUrlParser: true,
        dbName: "DigitalInvest"
    })

const Connection = connection;
const MoedaRepository = connection.model("moeda", moedaSchema);
const CotacaoRepository = connection.model("cotacao", cotacaoSchema);
const UsuarioRepository = connection.model("usuario", usuarioSchema);
const PedidoRepository = connection.model("pedido", pedidoSchema);

module.exports = {
    Connection,
    MoedaRepository,
    CotacaoRepository,
    UsuarioRepository,
    PedidoRepository
}
