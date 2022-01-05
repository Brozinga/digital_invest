using System.Collections.Generic;
using System.Security.Claims;

namespace digital.domain.InputViewModel
{
    public class PegarHistoricoCarteiraInputView
    {
        public PegarHistoricoCarteiraInputView(int? quantidadeRegistros = null, IEnumerable<Claim> usuarioClaims = null)
        {
            QuantidadeRegistros = quantidadeRegistros;
            UsuarioClaims = usuarioClaims;
        }

        [System.Text.Json.Serialization.JsonIgnore]
        public IEnumerable<Claim> UsuarioClaims { get; set; }

        public int? QuantidadeRegistros { get; set; }
    }
}
