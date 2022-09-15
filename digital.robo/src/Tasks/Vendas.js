const { AsyncTask } = require('toad-scheduler')
const dayjs = require('dayjs')
const WebSocket = require('ws')
const utc = require('dayjs/plugin/utc')
const logger = require("../Utils/logger")(__filename)
const StatusEnum = require("../../../digital.data/src/Enums/StatusEnum")

const ws = new WebSocket(`${process.env.WEB_SOCKET_URL}?id=${process.env.WEB_SOCKET_ID}`)

dayjs.extend(utc)

module.exports.ID = "JOB_VENDAS"

module.exports.VenderMoedasTask = (CotacoesRepository,
    PedidoRepository, UsuariosRepository,
    HistoricoCarteiraRepository) => new AsyncTask("Vendas", async () => {

        const pegandoTodosPedidos =
            await PedidoRepository.find(
                {
                    "ativo": true, "status": StatusEnum.ABERTO,
                    "dataVenda": { $lte: dayjs().utc().format() }
                }) || [];


        const horaAtual = dayjs().utc().unix();
        let horaVenda = null;
        let valorVenda = 0.0;
        let usuario = null;

        for (const item of pegandoTodosPedidos) {

            horaVenda = dayjs(item.dataVenda).unix()

            if (horaVenda <= horaAtual) {
                logger.info(`NUMERO DE PEDIDOS DE VENDA ENCONTRADOS: ${pegandoTodosPedidos.length}`)

                for (const mC of item.moedasCompra) {

                    const { valorCotado, dataCotacao } = await CotacoesRepository.findOne({
                        moedaId: mC.moedaId
                    }).sort({ dataCotacao: -1 });

                    item.moedasVenda.push({
                        valorCotado,
                        dataCotacao,
                        moedaId: mC.moedaId,
                        quantidade: mC.quantidade
                    })
                    valorVenda += (parseFloat(valorCotado) * mC.quantidade)
                }

                usuario = await UsuariosRepository.findOne({ _id: item.usuarioId });
                usuario.carteira += parseFloat(valorVenda);

                item.valorTotalVenda = parseFloat(valorVenda);
                item.status = StatusEnum.FECHADO;

                HistoricoCarteiraRepository.create({
                    usuarioId: item.usuarioId,
                    dataAdicao: dayjs().utc().format(),
                    carteira: parseFloat(usuario.carteira)
                })

                logger.info(`Enviando mensagem para atualização de tela`)
                ws.send(JSON.stringify({ "sendTo": usuario._id }))

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