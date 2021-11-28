using digital.data.DbContext;
using digital.data.Interfaces;

namespace digital.data.Repository
{
    public class CotacaoRepository : GenericRepository, ICotacaoRepository
    {
        public CotacaoRepository(MongoDbContext dbContext) : base(dbContext)
        {
        }
    }
}
