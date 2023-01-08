using digital.domain.Models;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace digital.data.Interfaces
{
    public interface IHistoricoCarteiraRepository : IDisposable
    {
        public Task<IList<HistoricoCarteira>> PegarUsuarioId(ObjectId usuarioId, int? quantidadeSelecionaveis = 20);
    }
}
