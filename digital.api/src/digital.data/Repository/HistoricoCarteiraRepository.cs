using digital.data.DbContext;
using digital.data.Interfaces;
using digital.domain.Models;
using System.Collections.Generic;
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
                .OrderByDescending(x => x.DataAdicao)
                .Where(x => x.UsuarioId == usuarioId);

            if (quantidadeSelecionaveis.HasValue)
            {
                query.Take(quantidadeSelecionaveis.Value);
            }

            return await query.ToListAsync();
        }
    }
}
