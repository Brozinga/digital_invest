using System.Collections.Generic;
using System.Security.Claims;

namespace digital.domain.InputViewModel
{
    public class PegarHistoricoComprasInputView
    {
        public PegarHistoricoComprasInputView(IEnumerable<Claim> usuarioClaims)
        {
            UsuarioClaims = usuarioClaims;
        }

        [System.Text.Json.Serialization.JsonIgnore]
        public IEnumerable<Claim> UsuarioClaims { get; set; }
    }
}
