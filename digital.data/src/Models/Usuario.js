const { Schema } = require("mongoose")

const usuarioSchema = new Schema({
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    ativo: { type: Boolean, required: true },
    carteira: { type: Number, required: true, default: 0 },
    dataCriacao: { type: Date, index: true }
  });

  module.exports = usuarioSchema;