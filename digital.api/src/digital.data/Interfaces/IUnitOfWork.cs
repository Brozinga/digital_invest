using System;

namespace digital.data.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        public IUsuarioRepository UsuarioRepository { get; }
        public IMoedaRepository MoedasRepository { get; }
        public ICotacaoRepository CotacaoRepository { get; }
        public IPedidoRepository PedidoRepository { get; }
        public IHistoricoCarteiraRepository HistoricoCarteiraRepository { get; }
    }
}
