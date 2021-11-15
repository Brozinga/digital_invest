using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace digital.domain.Models
{
    [BsonIgnoreExtraElements]
    public class Moeda
    {
        [BsonId]
        public string Id { get; set; }

        [BsonElement("nome")]
        [BsonRequired]
        public string Nome { get; set; }

        [BsonElement("acronimo")]
        [BsonRequired]
        public string Acronimo { get; set; }

        [BsonElement("logo")]
        [BsonRequired]
        public string Logo { get; set; }

        [BsonElement("ativo")]
        [BsonRequired]
        public bool Ativo { get; set; }

        [BsonElement("dataRegistro")]
        public DateTime DataRegistro { get; set; }

        [BsonIgnore]
        public virtual Cotacao cotacoes { get; set; }
    }
}
