using MongoDB.Bson;
using Newtonsoft.Json;
using System;

namespace digital.domain.OutputViewModel
{
    public class CotacoesListarOutputView
    {
        [JsonProperty(PropertyName = "idCotacao")]
        public string IdCotacao { get; set; }

        [JsonProperty(PropertyName = "valorCotado")]
        public double? ValorCotado { get; set; }

        [JsonProperty(PropertyName = "dataCotacao")]
        public DateTime? DataCotacao { get; set; }
    }
}
