using digital.domain.Models;
using Newtonsoft.Json;
using System;

namespace digital.domain.OutputViewModel
{
    public class HistoricoCarteiraOutputView
    {
        [JsonProperty(PropertyName = "historicoCotacaoId")]
        public string HistoricoCotacaoId { get; set; }

        [JsonProperty(PropertyName = "carteira")]
        public decimal? Carteira { get; set; }

        [JsonProperty(PropertyName = "dataAdicao")]
        public DateTime DataAdicao { get; set; }

        [JsonProperty(PropertyName = "dataAbreviada")]
        public string DataAbreviadaComHora { get; set; }

        public static HistoricoCarteiraOutputView Map(HistoricoCarteira data)
        {
            return new HistoricoCarteiraOutputView
            {
                HistoricoCotacaoId = data.Id.ToString(),
                Carteira = data.Carteira,
                DataAdicao = data.DataAdicao,
                DataAbreviadaComHora = data.DataAdicao.ToString("dd/MM-HH")
            };
        }

    }
}
