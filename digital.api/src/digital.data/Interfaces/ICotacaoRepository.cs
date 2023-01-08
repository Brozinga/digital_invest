using digital.domain.Models;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace digital.data.Interfaces
{
    public interface ICotacaoRepository: IDisposable
    {
        Task<ICollection<Cotacao>> PegarCotacoes(Expression<Func<Cotacao, bool>> filtro);
        Task<Cotacao> PegarCotacao(ObjectId id);
        Task<ICollection<Cotacao>> PegarUltimasCotacoes(int quantidade = 1);
        Task<Cotacao> PegarUltimaCotacaoPelaMoedaId(ObjectId moedaId);
        Task<ICollection<Cotacao>> PegarCotacoesPelaMoedaId(ObjectId moedaId, int quantidadeRegistros = 10);
    }
}
