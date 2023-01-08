using digital.data.DbContext;
using digital.data.Interfaces;
using digital.domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using MongoDB.Bson;
using AspNetCore.Identity.Mongo.Mongo;
using digital.domain.Enums;
using digital.util.Extensions;
using System;

namespace digital.data.Repository
{
    public class PedidoRepository : GenericRepository, IPedidoRepository
    {
        public PedidoRepository(MongoDbContext dbContext) : base(dbContext)
        {
        }

        public async void CriarPedido(Pedido pedido)
        {
            pedido.Status = EStatusPedido.ABERTO.ToDescriptionString();
            pedido.Ativo = true;
            pedido.DataCompra = DateTime.Now;

            await _dbContext.Pedidos.InsertOneAsync(pedido);
        }

        public async Task<Pedido> PegarPedido(ObjectId id, ObjectId usuarioId)
        {
           var result = await _dbContext.Pedidos.FirstOrDefaultAsync(x => x.Id == id && x.UsuarioId == usuarioId);
            return result;
        }

        public async Task<Pedido> PegarUltimoPedidoUsuario(ObjectId usuarioId)
        {
            var result = await _dbContext.Pedidos.AsQueryable()
                .Where(x => x.Ativo == true)
                .OrderByDescending(x => x.DataCompra)
                .FirstOrDefaultAsync(x => x.UsuarioId == usuarioId);

            return result;
        }

        public async Task<ReplaceOneResult> CancelarPedido(Pedido pedido)
        {
            pedido.Status = EStatusPedido.CANCELADO.ToDescriptionString();
            return await _dbContext.Pedidos.ReplaceOneAsync(x => x.Id == pedido.Id, pedido);
        }
        
        public async Task<int> PegarQuantidadeTotalPedidosPorUsuarioId(ObjectId usuarioId)
        {
            var query = _dbContext.Pedidos.AsQueryable()
                .Where(x => x.UsuarioId == usuarioId && x.Ativo == true);

            var pedidos = await query.ToListAsync();
            
            return pedidos.Count;
        }

        public async Task<ICollection<Pedido>> PegarPedidosPorUsuarioId(ObjectId usuarioId, int quantidadeRegistros = 0)
        {
            var pedidos = _dbContext.Pedidos.AsQueryable()
                .Where(x => x.UsuarioId == usuarioId && x.Ativo == true);

            if (quantidadeRegistros > 0)
                pedidos = pedidos.OrderByDescending(x => x.Id).Take(quantidadeRegistros);
            else
                pedidos.OrderByDescending(x => x.Id);

            return await pedidos.ToListAsync();
        }
    }
}
