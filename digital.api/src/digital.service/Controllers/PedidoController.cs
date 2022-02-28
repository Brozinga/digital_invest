using digital.business.Handlers;
using digital.domain.InputViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;

namespace digital.service.Controllers
{
    [Route("api/pedido")]
    [ApiController]
    public class PedidoController : ControllerBase
    {
        private readonly PedidoHandler _pedidoHandler;

        public PedidoController(PedidoHandler pedidoHandler)
        {
            _pedidoHandler = pedidoHandler;
        }

        [HttpPost("v1/novo")]
        [Authorize(Policy = "policy_basic")]
        public async Task<IActionResult> Novo([FromBody] NovoPedidoInputView data)
        {
            var identity = (ClaimsIdentity) User.Identity;
            data.UsuarioClaims = identity.Claims;

            var result = await _pedidoHandler.Executar(data); 
            return StatusCode((int) result.Status, result);
        }

        [HttpGet("v1/historico")]
        [Authorize(Policy = "policy_basic")]
        public async Task<IActionResult> Historico()
        {
            var identity = (ClaimsIdentity) User.Identity;

            var result = await _pedidoHandler.Executar(new PegarHistoricoComprasInputView(identity.Claims));
            return StatusCode((int)result.Status, result);
        }
    }
}
