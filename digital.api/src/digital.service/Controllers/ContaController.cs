﻿using digital.business.Handlers;
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

        [HttpGet("v1/historico_carteira")]
        [AuthorizeMultiplePolicy("policy_basic", false)]
        public async Task<IActionResult> PegarHistoricoCarteira([FromRoute] int quantidadeRegistros = 20)
        {
            var result = await _userHandler.Executar(
                new PegarHistoricoCarteiraInputView(quantidadeRegistros, User.Claims));
            return StatusCode((int)result.Status, result);
        }

        //TODO - Implementar pegar o histórico do que já comprei um dia.
        [HttpGet("v1/historico_compras")]
        [AuthorizeMultiplePolicy("policy_basic", false)]
        public async Task<IActionResult> PegarHistoricoCompras([FromRoute] int quantidadeRegistros = 20)
        {
            var result = await _userHandler.Executar(
                new PegarHistoricoCarteiraInputView(quantidadeRegistros, User.Claims));
            return StatusCode((int)result.Status, result);
        }

        //TODO - Implementar pegar o ultimo valor da minha carteira para atualização.
        [HttpGet("v1/carteira")]
        [AuthorizeMultiplePolicy("policy_basic", false)]
        public async Task<IActionResult> PegarValorCarteira([FromRoute] int quantidadeRegistros = 20)
        {
            var result = await _userHandler.Executar(
                new PegarHistoricoCarteiraInputView(quantidadeRegistros, User.Claims));
            return StatusCode((int)result.Status, result);
        }
    }
}
