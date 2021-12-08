using MongoDB.Bson;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace digital.domain.InputViewModel
{
    public class NovoPedidoInputView : BasicInputView
    {
        [JsonProperty("idUsuario")]
        [System.Text.Json.Serialization.JsonIgnore]
        public ObjectId IdUsuario { get; set; }

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
            
        }
    }
}
