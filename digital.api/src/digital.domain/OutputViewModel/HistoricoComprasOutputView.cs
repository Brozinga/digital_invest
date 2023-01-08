using System;
using System.Linq;
using digital.domain.Models;
using Newtonsoft.Json;

namespace digital.domain.OutputViewModel;

public class HistoricoComprasOutputView
{
    [JsonProperty(PropertyName = "id")]
    public string Id { get; set; }

    [JsonProperty(PropertyName = "moedas")]
    public string Moedas { get; set; }

    [JsonProperty(PropertyName = "valorTotalCompra")]
    public double ValorTotalCompra { get; set; }

    [JsonProperty(PropertyName = "valorTotalVenda")]
    public double ValorTotalVenda { get; set; }

    [JsonProperty(PropertyName = "dataCompra")]
    public DateTime DataCompra { get; set; }

    [JsonProperty(PropertyName = "dataVenda")]
    public DateTime DataVenda { get; set; }

    [JsonProperty(PropertyName = "status")]
    public string Status { get; set; }

    public static HistoricoComprasOutputView Map(Pedido pedido)
    {
        return new HistoricoComprasOutputView
        {
            Id = pedido.Id.ToString(),
            ValorTotalCompra = pedido.ValorTotalCompra,
            ValorTotalVenda = pedido.ValorTotalVenda,
            DataCompra = pedido.DataCompra,
            DataVenda = pedido.DataVenda,
            Status = pedido.Status
        };
    }
}