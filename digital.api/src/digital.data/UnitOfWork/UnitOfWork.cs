using digital.data.Interfaces;
using System;

namespace digital.data.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        public IUsuarioRepository UsuarioRepository { get; private set; }
        public IMoedaRepository MoedasRepository { get; private set; }
        public ICotacaoRepository CotacaoRepository { get; private set; }
        public IPedidoRepository PedidoRepository { get; private set; }
        public IHistoricoCarteiraRepository HistoricoCarteiraRepository { get; private set; }

        public UnitOfWork(IUsuarioRepository usuarioRepository, 
            IMoedaRepository moedasRepository, 
            ICotacaoRepository cotacaoRepository, 
            IPedidoRepository pedidoRepository,
            IHistoricoCarteiraRepository historicoCarteiraRepository)
        {
            UsuarioRepository = usuarioRepository;
            MoedasRepository = moedasRepository;
            CotacaoRepository = cotacaoRepository;
            PedidoRepository = pedidoRepository;
            HistoricoCarteiraRepository = historicoCarteiraRepository;
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
