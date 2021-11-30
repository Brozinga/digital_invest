using digital.assets.Texts;
using digital.business.Interfaces;
using digital.data.Interfaces;
using digital.domain.InputViewModel;
using digital.domain.OutputViewModel;
using digital.domain.Responses;
using Microsoft.Extensions.Hosting;
using System;
using System.Threading.Tasks;

namespace digital.business.Handlers
{
    public class CotacaoHandler : GenericHandler, 
        IHandlerBase<CotacaoPorAcronimoMoedaInputView, BasicResponse>

    {
        public CotacaoHandler(IUnitOfWork uow, IHostEnvironment env) : base(uow, env)
        {
        }

        public async Task<BasicResponse> Executar(CotacaoPorAcronimoMoedaInputView data)
        {
            try
            {
                var moeda = await _uow.MoedasRepository.PegarMoedaAcronimo(data.Acronimo);

                if (moeda == null)
                    return BasicResponse.NotFound(ErrorText.MoedasNaoExiste);

                var cotacoes = await _uow.CotacaoRepository.PegarCotacoesPelaMoedaId(moeda.Id);

                if (cotacoes == null || cotacoes?.Count <= 0)
                    return BasicResponse.NotFound(ErrorText.CotacoesNaoExiste);

                moeda.Cotacoes = cotacoes;
                return BasicResponse.OK(null, CotacaoPorAcronimoMoedaOutputView.Map(moeda));
            }
            catch (Exception ex)
            {
                return this.InternalServerError(ex);
            }


        }
    }
}
