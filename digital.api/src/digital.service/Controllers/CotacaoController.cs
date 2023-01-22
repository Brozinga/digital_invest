using System;
using digital.business.Handlers;
using digital.domain.InputViewModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace digital.service.Controllers
{
    [Route("api/cotacao")]
    [ApiController]
    public class CotacaoController : ControllerBase
    {
        private readonly CotacaoHandler _cotacaoHandler;
        private readonly ILogger<PedidoController> _logger;
        
        public CotacaoController(CotacaoHandler cotacaoHandler, ILogger<PedidoController> logger)
        {
            _cotacaoHandler = cotacaoHandler;
            _logger = logger;
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

            if(_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation("api/cotacao/listar_por_acronimo - DateTime: {DT} | Status Response: {status} | Acronimo: {data}",DateTime.UtcNow.ToLongTimeString(), result.Status, acronimo);

            return StatusCode((int)result.Status, result);
        }
    }
}
