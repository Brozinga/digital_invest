const { Schema, Types } = require("mongoose")
const Double = require("@mongoosejs/double")

const cotacaoSchema = new Schema({

    moedaId: { type: Schema.Types.ObjectId, required: true, ref: "moedas", index: true },
    dataCotacao: { type: Date, required: true },
    valorCotado: { type: Number, required: true }
});

module.exports = cotacaoSchema;