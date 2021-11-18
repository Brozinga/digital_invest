using digital.domain.Models;
using MongoDB.Driver;
using System;

namespace digital.data.DbContext
{
    public class MongoDbContext
    {
        public static string ConnectionString { get; set; }
        public static string DatabaseName { get; set; }
        public static bool IsSSL { get; set; }

        private IMongoDatabase Database { get; }

        private CreateIndexModel<Usuario> IndexModel { get; set; }

        public MongoDbContext()
        {
            try
            {
                MongoClientSettings settings = MongoClientSettings.FromUrl(new MongoUrl(ConnectionString));
                if (IsSSL)
                {
                    settings.SslSettings = new SslSettings { EnabledSslProtocols = System.Security.Authentication.SslProtocols.Tls12 };
                }

                var mongoClient = new MongoClient(settings);

                IndexModel = new CreateIndexModel<Usuario>(
                    new IndexKeysDefinitionBuilder<Usuario>()
                    .Ascending(new StringFieldDefinition<Usuario>("cpf")), new CreateIndexOptions() { Unique = true });


                Database = mongoClient.GetDatabase(DatabaseName);
            }
            catch (Exception ex)
            {
                throw new Exception("Não foi possível se conectar com o servidor.", ex);
            }
        }

        public IMongoDatabase MongoDatabase()
        {
            return Database;
        }


        public IMongoCollection<Usuario> Usuarios
        {
            get
            {
                var users = Database.GetCollection<Usuario>("usuarios");
                users.Indexes.CreateOneAsync(IndexModel);
                return users;
            }
        }

        public IMongoCollection<Cotacao> Cotacoes
        {
            get
            {
                return Database.GetCollection<Cotacao>("cotacoes");
            }
        }

        public IMongoCollection<Moeda> Moedas
        {
            get
            {
                return Database.GetCollection<Moeda>("moedas");
            }
        }

        public IMongoCollection<Pedido> Pedidos
        {
            get
            {
                return Database.GetCollection<Pedido>("pedidos");
            }
        }

        public IMongoCollection<Papel> Papeis
        {
            get
            {
                return Database.GetCollection<Papel>("papeis");
            }
        }
    }
}
