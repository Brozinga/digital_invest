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

        [HttpGet("v1/historico/{quantidadeRegistros:int}")]
        [Authorize(Policy = "policy_basic")]
        public async Task<IActionResult> Historico([FromRoute] int quantidadeRegistros)
        {
            var identity = (ClaimsIdentity) User.Identity;

            var result = await _pedidoHandler.Executar(new PegarHistoricoComprasInputView(identity.Claims, quantidadeRegistros));
            return StatusCode((int)result.Status, result);
        }
        
        [HttpDelete("v1/cancelar/{id}")]
        [Authorize(Policy = "policy_basic")]
        public async Task<IActionResult> Cancelar(string id)
        {
            var identity = (ClaimsIdentity) User.Identity;
            var data = new RemoverPedidoInputView()
            {
                Id = id,
                UsuarioClaims = identity.Claims
            };

            var result = await _pedidoHandler.Executar(data); 
            return StatusCode((int) result.Status, result);
        }
    }
}
