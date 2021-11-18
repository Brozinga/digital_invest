using digital.data.Interfaces;
using System;

namespace digital.data.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        public IUsuarioRepository UsuarioRepository { get; set; }
        public IMoedaRepository MoedasRepository { get; set; }
        public ICotacaoRepository CotacaoRepository { get; set; }
        public IPedidoRepository PedidoRepository { get; set; }

        public UnitOfWork(IUsuarioRepository usuarioRepository, 
            IMoedaRepository moedasRepository, 
            ICotacaoRepository cotacaoRepository, 
            IPedidoRepository pedidoRepository)
        {
            UsuarioRepository = usuarioRepository;
            MoedasRepository = moedasRepository;
            CotacaoRepository = cotacaoRepository;
            PedidoRepository = pedidoRepository;
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }
    }
}
