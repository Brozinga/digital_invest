using AspNetCore.Identity.MongoDbCore.Models;
using MongoDB.Bson;
using MongoDbGenericRepository.Attributes;
using System;

namespace digital.domain.Models
{
    [CollectionName("papeis")]
    public class Papel : MongoIdentityRole<ObjectId>
    {
        public Papel() : base()
        {

        }

        public Papel(string roleName) : base(roleName)
        {
        }

        public static implicit operator string(Papel v)
        {
            throw new NotImplementedException();
        }
    }
}
