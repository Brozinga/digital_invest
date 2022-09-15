using System.Collections.Generic;
using System.Security.Claims;

namespace digital.domain.InputViewModel;

public class RemoverPedidoInputView
{
    [System.Text.Json.Serialization.JsonIgnore]
    public IEnumerable<Claim> UsuarioClaims { get; set; }
    
    public string Id { get; set; }
}