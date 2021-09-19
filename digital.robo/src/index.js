const { ToadScheduler, SimpleIntervalJob } = require('toad-scheduler')

const {  MoedasRepository, CotacoesRepository } = require('./Database')


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

console.log(`#### ---- Running ${job.id} ---- ####`)

