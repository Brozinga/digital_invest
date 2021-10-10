const { ToadScheduler, SimpleIntervalJob } = require('toad-scheduler')

const { MoedaRepository, CotacaoRepository } = require('../../digital.data/src/Database')
const { ConvertSecondsToTime } = require("./Utils")
const logger = require("./Utils/logger")(__filename)


const { PegarCotacoesTask, ID: COTACOES_ID } = require('./Tasks/Cotacoes')

const scheduler = new ToadScheduler()

const JOB_COTACAO = new SimpleIntervalJob({ seconds: process.env.TEMPO_EXECUCAO_COTACAO },
    PegarCotacoesTask(MoedaRepository, CotacaoRepository), COTACOES_ID);

scheduler.addSimpleIntervalJob(JOB_COTACAO)

scheduler.startById(COTACOES_ID)

logger.info(`---- RODANDO ROBÔS ----`)
logger.info(`INTERVALO ENTRE AS EXECUÇÕES DE COTAÇÃO: ${ConvertSecondsToTime(process.env.TEMPO_EXECUCAO_COTACAO)}`)
