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
    public class PedidoRepository : GenericRepository, IPedidoRepository
    {
        public PedidoRepository(MongoDbContext dbContext) : base(dbContext)
        {
        }

        public async void CriarPedido(Pedido pedido)
        {
            await _dbContext.Pedidos.InsertOneAsync(pedido);
        }

        public async Task<ICollection<Pedido>> PegarPedidosPorUsuarioId(ObjectId usuarioId)
        {
            var pedidos = await _dbContext.Pedidos.AsQueryable()
                .Where(x => x.IdUsuario == usuarioId)
                .ToListAsync();

            return pedidos;
        }
    }
}
