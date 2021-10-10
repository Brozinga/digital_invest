const { AsyncTask } = require('toad-scheduler')
const { ConvertTimeSpanInDateTime } = require('../Utils')
const logger = require("../Utils/logger")(__filename)

module.exports.ID = "JOB_COTACOES"

const { BuscarTicker } = require("../Services")

module.exports.PegarCotacoesTask = (MoedasRepository,
    CotacoesRepository) => new AsyncTask(
        "Pegar Cotacoes",
        async () => {

            logger.info("INICIANDO COTAÇÕES")

            const todasMoedas = await MoedasRepository.find({ "ativo": true }) || [];

            logger.info("Quantidade de moedas selecionadas: " + todasMoedas.length)

            todasMoedas.forEach(async item => {

                const { data } = await BuscarTicker(item.acronimo)

                if (data != null || data != undefined) {

                    logger.info(`MOEDA: ${item.nome}, VALOR: ${Number(data?.ticker.last).toFixed(2)}`)

                    CotacoesRepository.create({
                        moedaId: item._id,
                        dataCotacao: ConvertTimeSpanInDateTime(data?.ticker.date),
                        valorCotado: Number(data?.ticker.last).toFixed(2)
                    })
                }
            })

            logger.info("COTAÇÕES FINALIZADOS")

        }
    )

