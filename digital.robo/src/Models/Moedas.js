const { Schema } = require("mongoose")

const moedasSchema = new Schema({
    nome: { type: String, required: true, unique: true },
    acronimo: { type: String, required: true, unique: true },
    logo: { type: String, required: true },
    ativo: { type: Boolean, required: true },
    dataRegistro: { type: Date, index: true }
  });

  module.exports = moedasSchema;