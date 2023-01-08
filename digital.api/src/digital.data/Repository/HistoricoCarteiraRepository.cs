using digital.data.DbContext;
using digital.data.Interfaces;
using digital.domain.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using MongoDB.Bson;

namespace digital.data.Repository
{
    public class HistoricoCarteiraRepository : GenericRepository, IHistoricoCarteiraRepository
    {
        public HistoricoCarteiraRepository(MongoDbContext dbContext) : base(dbContext)
        {
        }
        public async Task<IList<HistoricoCarteira>> PegarUsuarioId(ObjectId usuarioId, int? quantidadeSelecionaveis = 20)
        {
            var query = _dbContext.HistoricoCarteiras.AsQueryable()
                .Where(x => x.UsuarioId == usuarioId);

            if (quantidadeSelecionaveis.HasValue)
                query = query.OrderByDescending(x => x.DataAdicao).Take(quantidadeSelecionaveis.Value);
            else
                query = query.OrderByDescending(x => x.DataAdicao);

            return await query.ToListAsync();
        }
    }
}
