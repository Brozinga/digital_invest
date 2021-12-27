using digital.business.Handlers;
using digital.domain.InputViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace digital.service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoedaController : ControllerBase
    {
        private readonly MoedaHandler _moedaHandler;

        public MoedaController(MoedaHandler moedaHandler)
        {
            _moedaHandler = moedaHandler;
        }

        [HttpGet("/v1/listar")]
        [Authorize]
        public async Task<IActionResult> Listar()
        {
            var result = await _moedaHandler.Executar(new PegarTodasAsMoedasInputView());
            return StatusCode((int)result.Status, result);
        }

        [HttpGet("/v1/cotacoes")]
        [Authorize]
        public async Task<IActionResult> Cotacoes()
        {
            var result = await _moedaHandler.Executar(new PegarTodasAsMoedasCotacoesPorHoraInputView());
            return StatusCode((int)result.Status, result);
        }
    }
}
