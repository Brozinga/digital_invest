using AspNetCore.Identity.MongoDbCore.Models;
using MongoDB.Bson;
using MongoDbGenericRepository.Attributes;

namespace digital.domain.Models
{
    [CollectionName("Papeis")]
    public class Papeis : MongoIdentityRole<ObjectId>
    {
        public Papeis() : base()
        {

        }

        public Papeis(string roleName) : base(roleName)
        {
        }

        public override ObjectId Id { get; set; }
    }
}
