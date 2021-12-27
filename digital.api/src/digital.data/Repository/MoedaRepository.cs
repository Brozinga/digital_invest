using AspNetCore.Identity.Mongo.Mongo;
using digital.data.DbContext;
using digital.data.Interfaces;
using digital.domain.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace digital.data.Repository
{
    public class MoedaRepository : GenericRepository, IMoedaRepository
    {
        public MoedaRepository(MongoDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<Moeda> PegarMoedaAcronimo(string acronimo)
        {
            return await _dbContext.Moedas
                .FirstOrDefaultAsync(x => x.Acronimo.ToUpper() == acronimo.ToUpper());
        }

        public async Task<Moeda> PegarMoedaId(ObjectId id)
        {
            return await _dbContext.Moedas.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<ICollection<Moeda>> PegarTodasMoedas(Expression<Func<Moeda, bool>> filtro)
        {
            return await _dbContext.Moedas.AsQueryable()
                 .ToListAsync();
        }

        public async Task<ICollection<Moeda>> PegarTodasMoedas()
        {
            return await _dbContext.Moedas.AsQueryable()
                .Where(x => x.Ativo == true)
                 .ToListAsync();
        }

        public async Task<ICollection<Moeda>> PegarTodasMoedasComCotacoes()
        {
            var moedas = await _dbContext.Moedas
                .AsQueryable()
                .Where(x => x.Ativo == true)
                .ToListAsync();

            var cotacoes = await _dbContext.Cotacoes.AsQueryable()
                .OrderByDescending(x => x.DataCotacao)
                .Take(moedas.Count)
                .ToListAsync();

            foreach (var moeda in moedas)
            {
                moeda.Cotacoes = new List<Cotacao>
                {
                    cotacoes.First(x => x.MoedaId == moeda.Id)
                };
            }

            return moedas;
        }

        public async Task<Moeda> PegarMoedaCotacao(ObjectId moedaId)
        {

            var cotacoes = await _dbContext.Cotacoes.AsQueryable()
                                .Where(x => x.MoedaId == moedaId)
                                .OrderByDescending(x => x.DataCotacao)
                                .ToListAsync();

            var moedas = await _dbContext.Moedas.AsQueryable()
                                .Where(x => x.Id == moedaId && x.Ativo == true)
                                .FirstOrDefaultAsync();

            moedas.Cotacoes = cotacoes;

            return moedas;
        }

        public async Task<ICollection<Moeda>> PegarTodasMoedasComCotacoesPorHora()
        {
            var moedas = await _dbContext.Moedas
               .AsQueryable()
               .Where(x => x.Ativo == true)
               .ToListAsync();

            var cotacoes = await _dbContext.Cotacoes.AsQueryable()
                .Where(x => x.DataCotacao >= DateTime.Now.AddDays(-1))
                .ToListAsync();

            var cotacoesAgrupadas = cotacoes.GroupBy(x => x.DataCotacao.Hour);
            var cotacaoCorrente = new Cotacao();

            foreach (var moeda in moedas)
            {
                foreach (var ctgrupo in cotacoesAgrupadas)
                {
                    cotacaoCorrente = ctgrupo
                                             .OrderByDescending(x => x.DataCotacao)
                                             .FirstOrDefault(y => y.MoedaId == moeda.Id);

                    if (cotacaoCorrente != null)
                        moeda.Cotacoes.Add(cotacaoCorrente);
                }
            }

            return moedas;
        }

        public async Task<int> QuantidadeMoedas()
        {
            return (int)await _dbContext.Moedas.CountDocumentsAsync(x => x.Ativo == true);
        }
    }
}
