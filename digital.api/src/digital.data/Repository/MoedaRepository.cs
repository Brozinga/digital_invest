using digital.data.DbContext;
using digital.data.Interfaces;

namespace digital.data.Repository
{
    public class MoedaRepository : GenericRepository, IMoedaRepository
    {
        public MoedaRepository(MongoDbContext dbContext) : base(dbContext)
        {
        }
    }
}
