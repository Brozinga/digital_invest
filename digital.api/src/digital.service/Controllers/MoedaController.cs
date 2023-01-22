using System;
using digital.business.Handlers;
using digital.domain.InputViewModel;
using digital.util.Attributes;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace digital.service.Controllers
{
    [Route("api/moeda")]
    [ApiController]
    public class MoedaController : ControllerBase
    {
        private readonly MoedaHandler _moedaHandler;
        private readonly ILogger<PedidoController> _logger;
        
        public MoedaController(MoedaHandler moedaHandler, ILogger<PedidoController> logger)
        {
            _moedaHandler = moedaHandler;
            _logger = logger;
        }

        [HttpGet("v1/listar")]
        [AuthorizeMultiplePolicy("policy_basic", false)]
        public async Task<IActionResult> Listar()
        {
            var result = await _moedaHandler.Executar(new PegarTodasAsMoedasInputView());
            
            if(_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation("api/moeda/listar - DateTime: {DT} | Status Response: {status} | Dados: Listar",DateTime.UtcNow.ToLongTimeString(), result.Status);

            return StatusCode((int)result.Status, result);
        }

        [HttpGet("v1/cotacoes")]
        [AuthorizeMultiplePolicy("policy_basic", false)]
        public async Task<IActionResult> Cotacoes()
        {
            var result = await _moedaHandler.Executar(new PegarTodasAsMoedasCotacoesPorHoraInputView());
            
            if(_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation("api/moeda/cotacoes - DateTime: {DT} | Status Response: {status} | Dados: Cotacoes",DateTime.UtcNow.ToLongTimeString(), result.Status);

            return StatusCode((int)result.Status, result);
        }
        
        [HttpGet("v1/historico_completo/{quantidadeCotacoes:int}")]
        [AuthorizeMultiplePolicy("policy_basic", false)]
        public async Task<IActionResult> HistoricoCompleto(int quantidadeCotacoes)
        {
            var result = await _moedaHandler.Executar(new PegarTodasAsMoedasHistoricoCotacaoInputView()
            {
                quantidadeCotacoes = quantidadeCotacoes
            });
            
            if(_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation("api/moeda/historico_completo - DateTime: {DT} | Status Response: {status} | QtdCotacoes: {data}",DateTime.UtcNow.ToLongTimeString(), result.Status, quantidadeCotacoes.ToString());

            return StatusCode((int)result.Status, result);
        }
    }
}
