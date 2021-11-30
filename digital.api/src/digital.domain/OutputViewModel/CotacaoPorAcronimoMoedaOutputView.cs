using digital.domain.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;

namespace digital.domain.OutputViewModel
{
    public class CotacaoPorAcronimoMoedaOutputView
    {

        public CotacaoPorAcronimoMoedaOutputView()
        {
            Cotacoes = new Collection<CotacoesOutputView>();
        }

        public string Id { get; set; }

        [JsonProperty(PropertyName = "nome")]
        public string Nome { get; set; }

        [JsonProperty(PropertyName = "acronimo")]
        public string Acronimo { get; set; }

        [JsonProperty(PropertyName = "logo")]
        public string Logo { get; set; }

        [JsonProperty(PropertyName = "ativo")]
        public bool Ativo { get; set; }

        [JsonProperty(PropertyName = "dataRegistro")]
        public DateTime DataRegistro { get; set; }

        [JsonProperty(PropertyName = "cotacoes")]
        public virtual IEnumerable<CotacoesOutputView> Cotacoes { get; set; }

        public static CotacaoPorAcronimoMoedaOutputView Map(Moeda model) {

            var cotacoes = model.Cotacoes.Select(x => CotacoesOutputView.Map(x));

            var moeda = new CotacaoPorAcronimoMoedaOutputView
            {
                Id = model.Id.ToString(),
                Nome = model.Nome,
                Acronimo = model.Acronimo,
                Ativo = model.Ativo,
                Logo = model.Logo,
                DataRegistro = model.DataRegistro,
                Cotacoes = cotacoes
            };

            return moeda;
        }
    }

    public class CotacoesOutputView
    {
        public string Id { get; set; }

        [JsonProperty(PropertyName = "valorCotado")]
        public decimal ValorCotado { get; set; }

        [JsonProperty(PropertyName = "dataCotacao")]
        public DateTime DataCotacao { get; set; }

        public static CotacoesOutputView Map(Cotacao model) => new()
        {
            Id = model.Id.ToString(),
            DataCotacao = model.DataCotacao,
            ValorCotado = model.ValorCotado
        };
    }

}
