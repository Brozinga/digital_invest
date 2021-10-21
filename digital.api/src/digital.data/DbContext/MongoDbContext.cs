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

        private CreateIndexModel<Usuarios> IndexModel { get; set; }

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

                IndexModel = new CreateIndexModel<Usuarios>(
                    new IndexKeysDefinitionBuilder<Usuarios>()
                    .Ascending(new StringFieldDefinition<Usuarios>("cpf")), new CreateIndexOptions() { Unique = true });


                Database = mongoClient.GetDatabase(DatabaseName);
            }
            catch (Exception ex)
            {
                throw new Exception("Não foi possível se conectar com o servidor.", ex);
            }
        }

        public IMongoCollection<Usuarios> Usuarios
        {
            get
            {
                var users = Database.GetCollection<Usuarios>("usuarios");
                users.Indexes.CreateOneAsync(IndexModel);
                return users;
            }
        }

        public IMongoCollection<Cotacoes> Cotacoes
        {
            get
            {
                return Database.GetCollection<Cotacoes>("cotacoes");
            }
        }

        public IMongoCollection<Moedas> Moedas
        {
            get
            {
                return Database.GetCollection<Moedas>("moedas");
            }
        }

        public IMongoCollection<Pedidos> Pedidos
        {
            get
            {
                return Database.GetCollection<Pedidos>("pedidos");
            }
        }

        public IMongoCollection<Papeis> Papeis
        {
            get
            {
                return Database.GetCollection<Papeis>("papeis");
            }
        }
    }
}
