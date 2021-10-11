const { Schema, Types } = require("mongoose")
// const Double = require("@mongoosejs/double")

const cotacoesSchema = new Schema({
    moedaId: { type: Schema.Types.ObjectId, required: true, ref: "moeda", index: true },
    dataCotacao: { type: Date, required: true },
    valorCotado: { type: Number, required: true }
});

module.exports = cotacoesSchema;