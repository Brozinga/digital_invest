using digital.business.Handlers;
using digital.domain.InputViewModel;
using digital.util.Attributes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace digital.service.Controllers
{
    [ApiController]
    [Produces("application/json")]
    [Route("api/conta")]
    public class ContaController : ControllerBase
    {
        private readonly UsuarioHandler _userHandler;

        public ContaController(UsuarioHandler userHandler)
        {
            _userHandler = userHandler;
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
    }
}
