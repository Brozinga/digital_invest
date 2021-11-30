using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDbGenericRepository.Attributes;
using System;
using System.Collections.Generic;

namespace digital.domain.Models
{
    [CollectionName("pedidos")]
    [BsonIgnoreExtraElements]
    public class Pedido
    {
        public Pedido()
        {
            MoedasCompra = new List<MoedasCompraVenda>();
            MoedasVenda = new List<MoedasCompraVenda>();
        }

        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }

        [BsonElement("idUsuario")]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonRequired]
        public ObjectId IdUsuario { get; set; }

        [BsonElement("valorTotalCompra")]
        [BsonRequired]
        public decimal ValorTotalCompra { get; set; }

        [BsonElement("valorTotalVenda")]
        [BsonRequired]
        public decimal ValorTotalVenda { get; set; }

        [BsonElement("moedasCompra")]
        [BsonRequired]
        public List<MoedasCompraVenda> MoedasCompra { get; set; }

        [BsonElement("moedasVenda")]
        [BsonRequired]
        public List<MoedasCompraVenda> MoedasVenda { get; set; }

        [BsonElement("ativo")]
        [BsonRequired]
        public bool Ativo { get; set; }

        [BsonElement("dataCompra")]
        public DateTime DataCompra { get; set; }

        [BsonElement("dataVenda")]
        public DateTime DataVenda { get; set; }

        [BsonElement("status")]
        [BsonRequired]
        public string Status { get; set; }
    }
}
