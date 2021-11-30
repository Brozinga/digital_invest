using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace digital.domain.Models
{
    [BsonIgnoreExtraElements]
    public class Moeda
    {
        public Moeda()
        {
            Cotacoes = new Collection<Cotacao>();
        }

        [BsonId]
        public ObjectId Id { get; set; }

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
        public virtual ICollection<Cotacao> Cotacoes { get; set; }
    }
}
