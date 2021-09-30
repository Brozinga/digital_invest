const { ToadScheduler, SimpleIntervalJob } = require('toad-scheduler')

const { MoedasRepository, CotacoesRepository } = require('./Database')
const { ConvertSecondsToTime } = require("./Utils")
const logger = require("./Utils/logger")(__filename)


const { PegarCotacoesTask, COTACOES_ID } = require('./Tasks/Cotacoes')

const scheduler = new ToadScheduler()

const JOB_COTACAO = new SimpleIntervalJob({ seconds: process.env.TEMPO_EXECUCAO_COTACAO },
    PegarCotacoesTask(MoedasRepository, CotacoesRepository), COTACOES_ID);

scheduler.addSimpleIntervalJob(JOB_COTACAO)

scheduler.startById(COTACOES_ID)

logger.info(`---- RODANDO ROBÔS ----`)
logger.info(`INTERVALO ENTRE AS EXECUÇÕES DE COTAÇÃO: ${ConvertSecondsToTime(process.env.TEMPO_EXECUCAO_COTACAO)}`)
