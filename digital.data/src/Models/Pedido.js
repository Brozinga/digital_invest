const { Schema } = require("mongoose")

const pedidoSchema = new Schema({
    idUsuario: { type: Schema.Types.ObjectId, required: true, ref: "usuario", index: true },
    dataCompra: { type: Date, required: true},
    moedasCompra: [
      {
        nome: { type: String, required: true },
        acronimo: { type: String, required: true },
        logo: { type: String, required: true },
        ativo: { type: Boolean, required: true },
        dataRegistro: { type: Date, index: true }
      }
    ],
    moedasVenda: [
      {
        nome: { type: String, required: true },
        acronimo: { type: String, required: true },
        logo: { type: String, required: true },
        ativo: { type: Boolean, required: true },
        dataRegistro: { type: Date, index: true }
      }
    ],
    ativo: { type: Boolean, required: true },
    dataVenda: { type: Date, index: true },
    status: { type: String, required: true }
  });

  module.exports = pedidoSchema;