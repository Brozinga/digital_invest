const { Schema, Types } = require("mongoose")

const pedidosSchema = new Schema({
    usuarioId: { type: Schema.Types.ObjectId, required: true, ref: "usuarios", index: true },
    dataCompra: { type: Date, required: true},
    valorTotalCompra: { type: Number, required: true },
    valorTotalVenda: { type: Number, default: 0 },
    moedasCompra: [
      {
        moedaId: { type: Schema.Types.ObjectId, required: true, ref: "moedas", index: true },
        dataCotacao: { type: Date, required: true },
        valorCotado: { type: Number, required: true },
        quantidade: { type: Number, required: true }
      }
    ],
    moedasVenda: [
      {
        moedaId: { type: Schema.Types.ObjectId, required: true, ref: "moedas", index: true },
        dataCotacao: { type: Date, required: true },
        valorCotado: { type: Number, required: true },
        quantidade: { type: Number, required: true }
      }
    ],
    ativo: { type: Boolean, required: true },
    dataVenda: { type: Date, index: true },
    status: { type: String, required: true }
  });

  module.exports = pedidosSchema;