using AspNetCore.Identity.Mongo.Mongo;
using digital.data.DbContext;
using digital.data.Interfaces;
using digital.domain.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using MongoDB.Bson;

namespace digital.data.Repository
{
    public class CotacaoRepository : GenericRepository, ICotacaoRepository
    {
        public CotacaoRepository(MongoDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<Cotacao> PegarCotacao(ObjectId id)
        {
            var cotacao = await _dbContext.Cotacoes.FirstOrDefaultAsync(x => x.Id == id);
            return cotacao;
        }

        public async Task<Cotacao> PegarUltimaCotacaoPelaMoedaId(ObjectId moedaId)
        {
            var cotacao = await _dbContext.Cotacoes.AsQueryable()
                .OrderByDescending(x => x.DataCotacao)
                .FirstOrDefaultAsync(x => x.MoedaId == moedaId);

            return cotacao;
        }

        public async Task<ICollection<Cotacao>> PegarCotacoesPelaMoedaId(ObjectId moedaId, int quantidadeRegistros = 10)
        {
            var cotacoes = await _dbContext.Cotacoes.AsQueryable()
                .Where(x => x.MoedaId == moedaId)
                .OrderByDescending(x => x.DataCotacao)
                .Take(quantidadeRegistros)
                .ToListAsync();

            return cotacoes;
        }

        public async Task<ICollection<Cotacao>> PegarCotacoes(Expression<Func<Cotacao, bool>> filtro)
        {
            var cotacoes = await _dbContext.Cotacoes.AsQueryable()
                .Where(filtro).ToListAsync();
            return cotacoes;
        }

        public async Task<ICollection<Cotacao>> PegarUltimasCotacoes(int quantidade = 1)
        {
            var cotacoes = await _dbContext.Cotacoes.AsQueryable().Take(quantidade).ToListAsync();
            return cotacoes;
        }
    }
}
