using digital.assets.Texts;
using digital.util.Extensions;
using Flunt.Notifications;
using Flunt.Validations;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace digital.domain.InputViewModel
{
    public class NovoPedidoInputView : BasicInputView
    {

        [System.Text.Json.Serialization.JsonIgnore]
        public IEnumerable<Claim> UsuarioClaims { get; set; }

        [JsonProperty("valorTotalCompra")]
        [System.Text.Json.Serialization.JsonIgnore]
        public decimal ValorTotalCompra { get; set; }

        [JsonProperty("valorTotalVenda")]
        [System.Text.Json.Serialization.JsonIgnore]
        public decimal ValorTotalVenda { get; set; }

        [JsonProperty("moedasCompra")]
        public List<MoedaCompraVendaAdicionarInputView> MoedasCompra { get; set; }

        [JsonProperty("moedasVenda")]
        [System.Text.Json.Serialization.JsonIgnore]
        public List<MoedaCompraVendaAdicionarInputView> MoedasVenda { get; set; }

        [JsonProperty("dataCompra")]
        [System.Text.Json.Serialization.JsonIgnore]
        public DateTime DataCompra { get; set; }

        [JsonProperty("dataVenda")]
        public DateTime DataVenda { get; set; }



        public override void Validate()
        {
            this.TrimAllStrings();

            AddNotifications(
                new Contract<Notification>()
                    .IsGreaterThan(ValorTotalCompra, 0, "ValorTotalCompra", ErrorText.ValorTotalEMenorQueZero)
                    .IsGreaterThan(DataCompra, DateTime.Now.AddHours(3), "DataCompra", ErrorText.HoraCompraMinima)
                );
        }
    }
}
