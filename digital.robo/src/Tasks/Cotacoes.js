const { AsyncTask, Task } = require('toad-scheduler')
const { addHours } = require('date-fns')
const { PegarDataHoraAtual, ConvertTimeSpanInDateTime } = require('../Utils')
const logger = require("../Utils/logger")(__filename)

module.exports.COTACOES_ID = "JOB_COTACOES"

const { BuscarTicker } = require("../Services")

module.exports.PegarCotacoesTask = (MoedasRepository,
    CotacoesRepository) => new AsyncTask(
        "Pegar Cotacoes",
        async () => {

            logger.info("INICIANDO COTAÇÕES")

            const correctData = PegarDataHoraAtual();
            const advancedData = addHours(PegarDataHoraAtual(), 1);

            const existCotacoesNessaHora = await CotacoesRepository.findOne({
                "dataCotacao": {
                    $gt: correctData,
                    $lt: advancedData
                }
            })

            logger.info("Existe cotação nesse horário:" + !!existCotacoesNessaHora)


            if (existCotacoesNessaHora == null) {

                const todasMoedas = await MoedasRepository.find({ "ativo": true }) || [];

                logger.info("Quantidade de moedas selecionadas: " + todasMoedas.length)


                todasMoedas.forEach(async item => {

                    const result = await BuscarTicker(item.acronimo)
                    logger.info(`MOEDA: ${item.nome}, VALOR: ${Number(result.data?.ticker.last).toFixed(2)}`)

                    CotacoesRepository.create({
                        moedaId: item._id,
                        dataCotacao: ConvertTimeSpanInDateTime(result.data?.ticker.date),
                        valorCotado: Number(result.data?.ticker.last).toFixed(2)
                    })

                })
            }

            logger.info("COTAÇÕES FINALIZADOS")

        }
    )

