using System;
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
            
            if(_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation("api/conta/criar - DateTime: {DT} | Status Response: {status} | Dados: {data}",DateTime.UtcNow.ToLongTimeString(), result.Status, usuario);

            return StatusCode((int)result.Status, result);
        }

        [HttpPost("v1/alterar_senha")]
        [AuthorizeMultiplePolicy("policy_admin", false)]
        public async Task<IActionResult> AlterarSenha([FromBody] AlterarSenhaInputView passChange)
        {
            var result = await _userHandler.Executar(passChange);
            
            if(_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation("api/conta/alterar_senha - DateTime: {DT} | Status Response: {status} | Dados: {data}",DateTime.UtcNow.ToLongTimeString(), result.Status, passChange);

            return StatusCode((int)result.Status, result);
        }


        [HttpPost("v1/login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginInputView userLogin)
        {
            var result = await _userHandler.Executar(userLogin);
            
            if(_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation("api/conta/login - DateTime: {DT} | Status Response: {status} | Dados: {data}",DateTime.UtcNow.ToLongTimeString(), result.Status, userLogin);

            return StatusCode((int)result.Status, result);
        }

        [HttpGet("v1/historico_carteira")]
        [AuthorizeMultiplePolicy("policy_basic", false)]
        public async Task<IActionResult> PegarHistoricoCarteira([FromRoute] int quantidadeRegistros = 20)
        {
            var result = await _userHandler.Executar(
                new PegarHistoricoCarteiraInputView(quantidadeRegistros, User.Claims));
            
            if(_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation("api/conta/historico_carteira - DateTime: {DT} | Status Response: {status} | Dados: {data}",DateTime.UtcNow.ToLongTimeString(), result.Status, quantidadeRegistros.ToString());
            
            return StatusCode((int)result.Status, result);
        }
        
        [HttpGet("v1/saldo")]
        [AuthorizeMultiplePolicy("policy_basic", false)]
        public async Task<IActionResult> PegarSaldo()
        {
            var result = await _userHandler.Executar(
                new PegarSaldoInputView(User.Claims));
            
            if(_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation("api/conta/saldo - DateTime: {DT} | Status Response: {status} | PegandoSaldo",DateTime.UtcNow.ToLongTimeString(), result.Status);

            return StatusCode((int)result.Status, result);
        }
    }
}
