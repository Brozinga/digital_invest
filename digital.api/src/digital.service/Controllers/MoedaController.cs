using digital.business.Handlers;
using digital.domain.InputViewModel;
using digital.util.Attributes;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace digital.service.Controllers
{
    [Route("api/moeda")]
    [ApiController]
    public class MoedaController : ControllerBase
    {
        private readonly MoedaHandler _moedaHandler;

        public MoedaController(MoedaHandler moedaHandler)
        {
            _moedaHandler = moedaHandler;
        }

        [HttpGet("v1/listar")]
        [AuthorizeMultiplePolicy("policy_basic", false)]
        public async Task<IActionResult> Listar()
        {
            var result = await _moedaHandler.Executar(new PegarTodasAsMoedasInputView());
            return StatusCode((int)result.Status, result);
        }

        [HttpGet("v1/cotacoes")]
        [AuthorizeMultiplePolicy("policy_basic", false)]
        public async Task<IActionResult> Cotacoes()
        {
            var result = await _moedaHandler.Executar(new PegarTodasAsMoedasCotacoesPorHoraInputView());
            return StatusCode((int)result.Status, result);
        }
    }
}
