using digital.business.Handlers;
using digital.domain.InputViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace digital.service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PedidoController : ControllerBase
    {
        private readonly PedidoHandler _pedidoHandler;

        public PedidoController(PedidoHandler pedidoHandler)
        {
            _pedidoHandler = pedidoHandler;
        }

        [HttpPost("/novo")]
        [Authorize]
        public async Task<IActionResult> Novo([FromBody] NovoPedidoInputView data)
        {
            var identity = (ClaimsIdentity) User.Identity;
            data.UsuarioClaims = identity.Claims;

            var result = await _pedidoHandler.Executar(data); 
            return StatusCode((int) result.Status, result);
        }
    }
}
