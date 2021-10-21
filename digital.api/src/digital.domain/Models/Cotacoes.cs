using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace digital.domain.Models
{
    [BsonIgnoreExtraElements]
    public class Cotacoes
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("moedaId")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string MoedaId { get; set; }

        [BsonElement("valorCotado")]
        [BsonRequired]
        public decimal ValorCotado { get; set; }

        [BsonElement("dataCotacao")]
        public DateTime DataCotacao { get; set; }
    }
}
