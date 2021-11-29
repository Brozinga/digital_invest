using digital.domain.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace digital.data.Interfaces
{
    public interface ICotacaoRepository: IDisposable
    {
        Task<List<Cotacao>> PegarUltimasCotacoes();
        Task<Cotacao> PegarCotacao();
    }
}
