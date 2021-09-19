const { AsyncTask, Task } = require('toad-scheduler')
// import { formatDistance, subDays, subHours } from 'date-fns'

module.exports.COTACOES_ID = "COTACOES"

const { BuscarTicker } = require("../Services")



module.exports.PegarCotacoesTask = (MoedasRepository,
    CotacoesRepository) => new AsyncTask(
        "Pegar Cotacoes",
        async () => {

            const existCotacoesNessaHora = await CotacoesRepository.findOne({
                "dataCotacao": { $gt: new Date(Date.now()) }
            })


            //TODO: FINALIZAR A VALIDAÇÃO CASO JÁ TENHA FEITO NESSA HORA A COTAÇÃO.
            if (existCotacoesNessaHora == null) {

                const todasMoedas = await MoedasRepository.find({ "ativo": true });

                todasMoedas.forEach(async item => {

                    const result = await BuscarTicker(item.acronimo)
                    CotacoesRepository.create({
                        moedaId: item._id,
                        dataCotacao: new Date(result.data?.ticker.date * 1000),
                        valorCotado: Number(result.data?.ticker.last).toFixed(2)
                    })

                })
            }

        }
    )

