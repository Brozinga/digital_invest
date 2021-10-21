﻿using AspNetCore.Identity.MongoDbCore.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDbGenericRepository.Attributes;

namespace digital.domain.Models
{
    [CollectionName("usuarios")]
    [BsonIgnoreExtraElements]
    public class Usuarios : MongoIdentityUser<ObjectId>
    {
        public Usuarios() : base()
        {
        }

        public Usuarios(string nome, string email, string cpf) : base(email, email)
        {
            CPF = cpf;
            Nome = nome;
        }

        public override ObjectId Id { get; set; }

        [BsonElement("email")]
        [BsonRequired]
        public override string Email { get; set; }

        [BsonElement("nome")]
        [BsonRequired]
        public string Nome { get; set; }

        [BsonElement("senha")]
        [BsonRequired]
        public override string PasswordHash { get; set; }

        [BsonElement("cpf")]
        [BsonRequired]
        public string CPF { get; set; }

        [BsonElement("ativo")]
        [BsonRequired]
        public bool Ativo { get; set; } = true;

        [BsonElement("carteira")]
        [BsonRequired]
        [BsonDefaultValue(0)]
        public decimal Carteira { get; set; } = 600M;

    }
}
