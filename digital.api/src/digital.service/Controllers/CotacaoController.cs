using digital.business.Handlers;
using digital.domain.InputViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace digital.service.Controllers
{
    [Route("api/cotacao")]
    [ApiController]
    public class CotacaoController : ControllerBase
    {
        private readonly CotacaoHandler _cotacaoHandler;

        public CotacaoController(CotacaoHandler cotacaoHandler)
        {
            _cotacaoHandler = cotacaoHandler;
        }

        [HttpGet("v1/listar_por_acronimo/{acronimo}")]
        [Authorize(Policy = "policy_basic")]
        public async Task<IActionResult> ListarPorAcronimo(string acronimo)
        {
            var result = await _cotacaoHandler.Executar(
                new CotacaoPorAcronimoMoedaInputView
                {
                    Acronimo = acronimo.Trim().ToUpper()
                });

            return StatusCode((int)result.Status, result);
        }
    }
}
