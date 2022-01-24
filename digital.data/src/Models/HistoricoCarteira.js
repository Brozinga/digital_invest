const { Schema, Types } = require("mongoose")

const historicoCarteiraSchema = new Schema({
    usuarioId: { type: Types.ObjectId, required: true, ref: "usuarios", index: true },
    dataAdicao: { type: Date, required: true},
    carteira: { type: Number, required: true },
    });

  module.exports = historicoCarteiraSchema;