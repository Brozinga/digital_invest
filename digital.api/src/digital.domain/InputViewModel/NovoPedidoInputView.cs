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

        public NovoPedidoInputView()
        {
            DataCompra = DateTime.Now;

        }

        [System.Text.Json.Serialization.JsonIgnore]
        public IEnumerable<Claim> UsuarioClaims { get; set; }

        [JsonProperty("valorTotalCompra")]
        [System.Text.Json.Serialization.JsonIgnore]
        public double ValorTotalCompra { get; set; }

        [JsonProperty("valorTotalVenda")]
        [System.Text.Json.Serialization.JsonIgnore]
        public double ValorTotalVenda { get; set; }

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

            AddNotifications(
                new Contract<Notification>()
                    .IsGreaterThan(MoedasCompra.Count, 0, "MoedasCompra", ErrorText.QuantidadeMoedaCompra)
                    .IsGreaterThan(DataVenda, DateTime.Now.AddHours(2), "DataVenda", ErrorText.HoraCompraMinima)
                );
        }
    }
}
