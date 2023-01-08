using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace digital.domain.Models
{
    public class MoedasCompraVenda
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }

        [BsonElement("moedaId")]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonRequired]
        public ObjectId MoedaId { get; set; }

        [BsonElement("valorCotado")]
        [BsonRequired]
        public double ValorCotado { get; set; }

        [BsonElement("dataCotacao")]
        public DateTime DataCotacao { get; set; }

        [BsonElement("quantidade")]
        public int Quantidade { get; set; }
    }
}
