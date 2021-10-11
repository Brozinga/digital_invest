const { AsyncTask } = require('toad-scheduler')
const logger = require("../Utils/logger")(__filename)
const StatusEnum = require("../../../digital.data/src/Enums/StatusEnum")

module.exports.ID = "JOB_VENDAS"

module.exports.VenderMoedasTask = (CotacoesRepository,
    PedidoRepository) => new AsyncTask("Vendas", async () => {

        logger.info("INICIANDO JOB DE VENDAS")

        const pegandoTodosPedidos =
            await PedidoRepository.find(
                {
                    "ativo": true, "status": StatusEnum.ABERTO,
                    "dataVenda": { $lte: new Date() }
                }) || [];

        logger.info(`NUMERO DE PEDIDOS DE VENDA ENCONTRADOS: ${pegandoTodosPedidos.length}`)

        const horaAtual = new Date().getHours();
        let horaVenda = null;
        let valorVenda = 0;

        for (const item of pegandoTodosPedidos) {
            horaVenda = item.dataVenda.getHours();

            if (horaVenda <= horaAtual) {

                for (const mC of item.moedasCompra) {

                    const { valorCotado, dataCotacao, moedaId } = await CotacoesRepository.findOne({
                        moedaId: mC.moedaId
                    }).sort({ dataCotacao: -1 });

                    item.moedasVenda.push({
                        valorCotado,
                        dataCotacao,
                        moedaId,
                        quantidade: mC.quantidade
                    })
                    valorVenda += Number((valorCotado * mC.quantidade).toFixed(2))
                }

                item.valorTotalVenda = valorVenda;
                item.status = StatusEnum.FECHADO;

                logger.info(`PEDIDO Nº: ${item._id}`)
                logger.info(`VALOR DE COMPRA: ${item.valorTotalCompra}`)
                logger.info(`VALOR DE VENDA: ${valorVenda}`)

                item.save();
            }

        }

    });