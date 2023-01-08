using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace digital.domain.Models
{
    [BsonIgnoreExtraElements]
    public class HistoricoCarteira
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }

        [BsonElement("usuarioId")]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonRequired]
        public ObjectId UsuarioId { get; set; }

        [BsonElement("carteira")]
        [BsonRequired]
        public double Carteira { get; set; }

        [BsonElement("dataAdicao")]
        public DateTime DataAdicao { get; set; }
    }
}
