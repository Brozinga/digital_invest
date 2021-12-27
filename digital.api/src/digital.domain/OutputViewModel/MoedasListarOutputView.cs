using digital.domain.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using JsonIgnoreAttribute = System.Text.Json.Serialization.JsonIgnoreAttribute;

namespace digital.domain.OutputViewModel
{
    public class MoedasListarOutputView
    {
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
        public IEnumerable<CotacoesListarOutputView> Cotacoes { get; set; }

        public static MoedasListarOutputView Map(Moeda model)
        {
            return new MoedasListarOutputView
            {
                Id = model.Id.ToString(),
                Nome = model.Nome,
                Acronimo = model.Acronimo,
                Ativo = model.Ativo,
                Logo = model.Logo,
                DataRegistro = model.DataRegistro,
                Cotacoes = model.Cotacoes.Select(m => new CotacoesListarOutputView
                {
                    IdCotacao = m.Id.ToString(),
                    ValorCotado = m.ValorCotado,
                    DataCotacao = m.DataCotacao
                })
            };
        }
    }
}
