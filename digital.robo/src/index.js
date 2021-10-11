const { ToadScheduler, SimpleIntervalJob } = require('toad-scheduler')

const { MoedasRepository, CotacoesRepository, PedidosRepository, UsuariosRepository } = require('../../digital.data/src/Database')
const { ConvertSecondsToTime } = require("./Utils")
const logger = require("./Utils/logger")(__filename)


const { PegarCotacoesTask, ID: COTACOES_ID } = require('./Tasks/Cotacoes')
const { VenderMoedasTask, ID: VENDAS_ID } = require('./Tasks/Vendas')

const scheduler = new ToadScheduler()

//JOB DE COTAÇÃO DAS MOEDAS
const JOB_COTACAO = new SimpleIntervalJob({ seconds: process.env.TEMPO_EXECUCAO_COTACAO },
    PegarCotacoesTask(MoedasRepository, CotacoesRepository), COTACOES_ID);

//JOB DE VENDA DAS MOEDAS
const JOB_VENDA = new SimpleIntervalJob({ seconds: process.env.TEMPO_EXECUCAO_VENDA },
    VenderMoedasTask(CotacoesRepository, PedidosRepository, UsuariosRepository), VENDAS_ID);

scheduler.addSimpleIntervalJob(JOB_COTACAO)
scheduler.addSimpleIntervalJob(JOB_VENDA)

scheduler.startById(COTACOES_ID)

logger.info(`---- RODANDO ROBÔS ----`)
logger.info(`INTERVALO ENTRE AS EXECUÇÕES DE COTAÇÃO: ${ConvertSecondsToTime(process.env.TEMPO_EXECUCAO_COTACAO)}`)
logger.info(`INTERVALO ENTRE AS EXECUÇÕES DE VENDA: ${ConvertSecondsToTime(process.env.TEMPO_EXECUCAO_VENDA)}`)
