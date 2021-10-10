const { Schema } = require("mongoose")

const moedaSchema = new Schema({
    nome: { type: String, required: true, unique: true },
    acronimo: { type: String, required: true, unique: true },
    logo: { type: String, required: true },
    ativo: { type: Boolean, required: true },
    dataRegistro: { type: Date, index: true }
  });

  module.exports = moedaSchema;