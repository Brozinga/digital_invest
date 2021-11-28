using digital.data.DbContext;
using digital.data.Interfaces;

namespace digital.data.Repository
{
    public class PedidoRepository : GenericRepository, IPedidoRepository
    {
        public PedidoRepository(MongoDbContext dbContext) : base(dbContext)
        {
        }
    }
}
