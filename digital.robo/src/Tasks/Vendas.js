const { AsyncTask } = require('toad-scheduler')
const logger = require("../Utils/logger")(__filename)

module.exports.ID = "JOB_VENDAS"

module.exports.VenderMoedasTask = (MedasRepository,
    CotacaoRepository,
    PedidoRepository) => new AsyncTask(
        
    );