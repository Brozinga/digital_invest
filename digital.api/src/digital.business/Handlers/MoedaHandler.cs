using digital.assets.Texts;
using digital.business.Interfaces;
using digital.data.Interfaces;
using digital.domain.OutputViewModel;
using digital.domain.Responses;
using Microsoft.Extensions.Hosting;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace digital.business.Handlers
{
    public class MoedaHandler : GenericHandler, IHandlerBase<object, BasicResponse>
    {
        public MoedaHandler(IUnitOfWork uow, IHostEnvironment env) : base(uow, env)
        {
        }

        public async Task<BasicResponse> Executar(object data)
        {
            try
            {
                var moedas = await _uow.MoedasRepository.PegarTodasMoedas();

                if (moedas == null)
                    return BasicResponse.NotFound(ErrorText.MoedasNaoExiste);

                return BasicResponse.OK(null, moedas.Select(x => MoedasListarOutputView.Map(x)));
            }
            catch (Exception ex)
            {
                return this.InternalServerError(ex);
            }

        }
    }
}
