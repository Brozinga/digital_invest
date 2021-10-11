const { AsyncTask } = require('toad-scheduler')
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const logger = require("../Utils/logger")(__filename)
const StatusEnum = require("../../../digital.data/src/Enums/StatusEnum")

dayjs.extend(utc)

module.exports.ID = "JOB_VENDAS"

module.exports.VenderMoedasTask = (CotacoesRepository,
    PedidoRepository,
    UsuariosRepository) => new AsyncTask("Vendas", async () => {

        const pegandoTodosPedidos =
            await PedidoRepository.find(
                {
                    "ativo": true, "status": StatusEnum.ABERTO,
                    "dataVenda": { $lte: dayjs().utc().format() }
                }) || [];


        const horaAtual = dayjs().utc().hour();
        let horaVenda = null;
        let valorVenda = 0;
        let usuario = null;

        for (const item of pegandoTodosPedidos) {
            logger.info(`NUMERO DE PEDIDOS DE VENDA ENCONTRADOS: ${pegandoTodosPedidos.length}`)

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

                usuario = await UsuariosRepository.findOne({ _id: item.idUsuario });
                usuario.carteira += valorVenda;

                item.valorTotalVenda = valorVenda;
                item.status = StatusEnum.FECHADO;

                logger.info(`PEDIDO Nº: ${item._id}`)
                logger.info(`VALOR DE COMPRA: ${item.valorTotalCompra}`)
                logger.info(`VALOR DE VENDA: ${valorVenda}`)
                logger.info(`USUARIO ID: ${usuario._id}`)
                logger.info(`USUARIO E-MAIL: ${usuario.email}`)
                logger.info(`VALOR DA CARTEIRA: ${usuario.carteira}`)

                usuario.save();
                item.save();
            }

        }

    });