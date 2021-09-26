const { ToadScheduler, SimpleIntervalJob } = require('toad-scheduler')

const { MoedasRepository, CotacoesRepository } = require('./Database')
const { ConvertSecondsToTime } = require("./Utils")
const logger = require("./Utils/logger")(__filename)


const { PegarCotacoesTask, COTACOES_ID } = require('./Tasks/Cotacoes')

const scheduler = new ToadScheduler()

const job =
    new SimpleIntervalJob(
        {
            seconds: process.env.TEMPO_EXECUCAO
        },
        PegarCotacoesTask(MoedasRepository, CotacoesRepository), COTACOES_ID);



scheduler.addSimpleIntervalJob(job)

job.start()

logger.info(`RODANDO ROBÔS`)
logger.info(`TIMER: ${ConvertSecondsToTime(process.env.TEMPO_EXECUCAO)}`)
