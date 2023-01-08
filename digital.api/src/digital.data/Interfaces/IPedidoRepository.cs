using digital.domain.Models;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace digital.data.Interfaces
{
    public interface IPedidoRepository : IDisposable
    {
        void CriarPedido(Pedido pedido);
        Task<int> PegarQuantidadeTotalPedidosPorUsuarioId(ObjectId usuarioId);
        Task<ICollection<Pedido>> PegarPedidosPorUsuarioId(ObjectId usuarioId, int quantidadeRegistros = 0);
        Task<Pedido> PegarPedido(ObjectId id,  ObjectId usuarioId);
        Task<ReplaceOneResult> CancelarPedido(Pedido pedido);
    }
}
