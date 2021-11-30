using AspNetCore.Identity.Mongo.Mongo;
using digital.data.DbContext;
using digital.data.Interfaces;
using digital.domain.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace digital.data.Repository
{
    public class MoedaRepository : GenericRepository, IMoedaRepository
    {
        public MoedaRepository(MongoDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<Moeda> PegarMoedaAcronimo(string acronimo)
        {
            return await _dbContext.Moedas
                .FirstOrDefaultAsync(x => x.Acronimo.ToUpper() == acronimo.ToUpper());
        }

        public async Task<Moeda> PegarMoedaId(ObjectId id)
        {
            return await _dbContext.Moedas.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<ICollection<Moeda>> PegarTodasMoedas(Expression<Func<Moeda, bool>> filtro)
        {
            return await _dbContext.Moedas.AsQueryable()
                 .ToListAsync();
        }

        public async Task<ICollection<Moeda>> PegarTodasMoedas()
        {
            return await _dbContext.Moedas.AsQueryable()
                .Where(x => x.Ativo == true)
                 .ToListAsync();
        }

        public async Task<int> QuantidadeMoedas()
        {
            return (int) await _dbContext.Moedas.CountDocumentsAsync(x => x.Ativo == true);
        }
    }
}
