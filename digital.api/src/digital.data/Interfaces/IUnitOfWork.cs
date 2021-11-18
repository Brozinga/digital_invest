using System;

namespace digital.data.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        public IUsuarioRepository UsuarioRepository { get; set; }
        public IMoedaRepository MoedasRepository { get; set; }
        public ICotacaoRepository CotacaoRepository { get; set; }
        public IPedidoRepository PedidoRepository { get; set; }
    }
}
