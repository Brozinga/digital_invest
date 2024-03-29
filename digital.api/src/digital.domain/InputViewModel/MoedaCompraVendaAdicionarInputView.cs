﻿using digital.assets.Texts;
using digital.util.Extensions;
using Flunt.Notifications;
using Flunt.Validations;
using MongoDB.Bson;
using Newtonsoft.Json;
using System;

namespace digital.domain.InputViewModel
{
    public class MoedaCompraVendaAdicionarInputView : BasicInputView
    {
        [JsonProperty("moedaId")]
        public string MoedaId { get; set; }

        [JsonProperty("valorCotado")]
        [System.Text.Json.Serialization.JsonIgnore]
        public decimal ValorCotado { get; set; }

        [JsonProperty("dataCotacao")]
        [System.Text.Json.Serialization.JsonIgnore]
        public DateTime DataCotacao { get; set; }

        [JsonProperty("quantidade")]
        public int Quantidade { get; set; }

        public override void Validate()
        {
            this.TrimAllStrings();

            AddNotifications(new Contract<Notification>()
                .IsNotNullOrEmpty(MoedaId, ErrorText.MoedaIdObrigatorio)
                .IsGreaterThan(Quantidade, 0, "quantidade", ErrorText.QuantidadeMoedasMinima));
        }
    }
}
