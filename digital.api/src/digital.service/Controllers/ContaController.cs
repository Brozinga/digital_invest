using digital.business.Handlers;
using digital.domain.InputViewModel;
using digital.util.Attributes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace digital.service.Controllers
{
    [ApiController]
    [Produces("application/json")]
    [Route("api/conta")]
    public class ContaController : ControllerBase
    {
        private readonly UsuarioHandler _userHandler;
        private readonly ILogger<ContaController> _logger;

        public ContaController(UsuarioHandler userHandler, ILogger<ContaController> logger)
        {
            _userHandler = userHandler;
            _logger = logger;
        }

        /// <summary>
        /// Método para criar novos usuários
        /// </summary>
        /// <param name="usuario"></param>
        /// <returns></returns>
        [HttpPost("v1/criar")]
        [AllowAnonymous]
        public async Task<IActionResult> Criar([FromBody] NovoUsuarioInput usuario)
        {
            var result = await _userHandler.Executar(usuario);
            return StatusCode((int)result.Status, result);
        }

        [HttpPost("v1/alterar_senha")]
        [AuthorizeMultiplePolicy("policy_admin", false)]
        public async Task<IActionResult> AlterarSenha([FromBody] AlterarSenhaInputView passChange)
        {
            var result = await _userHandler.Executar(passChange);
            return StatusCode((int)result.Status, result);
        }


        [HttpPost("v1/login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginInputView userLogin)
        {
            var result = await _userHandler.Executar(userLogin);
            return StatusCode((int)result.Status, result);
        }

        [HttpGet("v1/historico_carteira")]
        [AuthorizeMultiplePolicy("policy_basic", false)]
        public async Task<IActionResult> PegarHistoricoCarteira([FromRoute] int quantidadeRegistros = 20)
        {
            var result = await _userHandler.Executar(
                new PegarHistoricoCarteiraInputView(quantidadeRegistros, User.Claims));
            return StatusCode((int)result.Status, result);
        }
        
        [HttpGet("v1/saldo")]
        [AuthorizeMultiplePolicy("policy_basic", false)]
        public async Task<IActionResult> PegarSaldo()
        {
            var result = await _userHandler.Executar(
                new PegarSaldoInputView(User.Claims));
            return StatusCode((int)result.Status, result);
        }
    }
}
