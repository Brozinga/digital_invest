using AspNetCore.Identity.MongoDbCore.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDbGenericRepository.Attributes;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace digital.domain.Models
{
    [CollectionName("usuarios")]
    [BsonIgnoreExtraElements]
    public class Usuario : MongoIdentityUser<ObjectId>
    {
        public Usuario() : base()
        {
            RolesName = new Collection<string>();
        }

        public Usuario(string nome, string email, string cpf) : base(email, email)
        {
            CPF = cpf;
            Nome = nome;
            RolesName = new Collection<string>();

        }

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

        [BsonElement("RolesName")]
        public ICollection<string> RolesName { get; set; }

        public bool AddRole(ObjectId roleId, string roleName)
        {
            RolesName.Add(roleName);
            return base.AddRole(roleId);
        }
    }
}
