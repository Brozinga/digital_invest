using System.Collections.Generic;
using System.Security.Claims;

namespace digital.domain.InputViewModel
{
    public class PegarHistoricoComprasInputView
    {
        public PegarHistoricoComprasInputView(IEnumerable<Claim> usuarioClaims, int quantidadeRegistros = 0)
        {
            UsuarioClaims = usuarioClaims;
            QuantidadeRegistros = quantidadeRegistros;
        }

        [System.Text.Json.Serialization.JsonIgnore]
        public IEnumerable<Claim> UsuarioClaims { get; private set; }
        
        public int QuantidadeRegistros { get; private set; }
    }
}
