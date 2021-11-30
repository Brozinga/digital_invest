using digital.domain.Models;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace digital.data.Interfaces
{
    public interface IMoedaRepository : IDisposable
    {
        Task<ICollection<Moeda>> PegarTodasMoedas(Expression<Func<Moeda, bool>> filtro);
        Task<ICollection<Moeda>> PegarTodasMoedas();
        Task<int> QuantidadeMoedas();
        Task<Moeda> PegarMoedaAcronimo(string acronimo);
        Task<Moeda> PegarMoedaId(ObjectId id);
    }
}
