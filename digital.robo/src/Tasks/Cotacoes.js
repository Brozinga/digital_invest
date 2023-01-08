const { AsyncTask } = require('toad-scheduler')
const { ConvertTimeSpanInDateTime } = require('../Utils')
const logger = require("../Utils/logger")(__filename)
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')

dayjs.extend(utc)

module.exports.ID = "JOB_COTACOES"

const { BuscarTicker } = require("../Services")

module.exports.PegarCotacoesTask = (MoedasRepository,
    CotacoesRepository) => new AsyncTask(
        "Pegar Cotacoes",
        async () => {

            logger.info("INICIANDO COTAÇÕES")

            let dataRemocao = dayjs().subtract(
                process.env.DIAS_REMOCAO, 'days');

            logger.info(`Dias retroativos para remocao do historico: ${process.env.DIAS_REMOCAO}`)
            logger.info(`Data de permanencia do historico (a partir de): ${dataRemocao.format("DD/MM/YYYY")}`)

            logger.info("DELETANDO HISTORICO DE COTACOES")

            await CotacoesRepository.deleteMany({
                dataCotacao: {
                    $lt: dataRemocao
                }
            })

            logger.info("SELECIONANDO AS MOEDAS PARA COTACAO")
            const todasMoedas = await MoedasRepository.find({ "ativo": true }) || [];

            logger.info("Quantidade de moedas selecionadas: " + todasMoedas.length)

            todasMoedas.forEach(async item => {

                const { data } = await BuscarTicker(item.acronimo)

                if (data != null || data != undefined) {

                    logger.info(`MOEDA: ${item.nome}, VALOR: ${Number(data?.ticker.last).toFixed(2)}`)

                    CotacoesRepository.create({
                        moedaId: item._id,
                        dataCotacao: dayjs(data?.ticker.date * 1000).utc().format(),
                        valorCotado: Number(data?.ticker.last).toFixed(2)
                    })
                }
            })

            logger.info("COTAÇÕES FINALIZADOS")

        }
    )

