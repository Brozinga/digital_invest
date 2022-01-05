using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace digital.domain.Models
{
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
        public decimal Carteira { get; set; }

        [BsonElement("dataAdicao")]
        public DateTime DataAdicao { get; set; }
    }
}
