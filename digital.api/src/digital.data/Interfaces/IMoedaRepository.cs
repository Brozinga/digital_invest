using digital.domain.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace digital.data.Interfaces
{
    public interface IMoedaRepository : IDisposable
    {
        Task<List<Moeda>> PegarTodasMoedas(Expression<Func<Moeda, bool>> filtro);
    }
}
