using digital.domain.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace digital.data.Interfaces
{
    public interface IPedidoRepository : IDisposable
    {
        Task<Pedido> CriarPedido(Pedido pedido);

        Task<List<Pedido>> PegarPedidosPorUsuarioId(string usuarioId);
    }
}
