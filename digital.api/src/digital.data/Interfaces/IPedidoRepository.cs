using digital.domain.Models;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace digital.data.Interfaces
{
    public interface IPedidoRepository : IDisposable
    {
        void CriarPedido(Pedido pedido);
        Task<ICollection<Pedido>> PegarPedidosPorUsuarioId(ObjectId usuarioId);
        Task<Pedido> PegarPedido(ObjectId id);

    }
}
