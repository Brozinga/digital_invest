using digital.domain.Models;
using Newtonsoft.Json;
using System;

namespace digital.domain.OutputViewModel
{
    public class SaldoCarteiraOutputView
    {
        [JsonProperty(PropertyName = "carteira")]
        public double? Carteira { get; set; }
        
        public static SaldoCarteiraOutputView Map(Usuario data)
        {
            return new SaldoCarteiraOutputView
            {
                Carteira = data.Carteira,
            };
        }

    }
}
