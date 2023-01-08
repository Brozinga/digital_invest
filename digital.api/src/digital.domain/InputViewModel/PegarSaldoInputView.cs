using System.Collections.Generic;
using System.Security.Claims;

namespace digital.domain.InputViewModel
{
    public class PegarSaldoInputView
    {
        public PegarSaldoInputView(IEnumerable<Claim> usuarioClaims = null)
        {
            UsuarioClaims = usuarioClaims;
        }

        [System.Text.Json.Serialization.JsonIgnore]
        public IEnumerable<Claim> UsuarioClaims { get; set; }
    }
}
