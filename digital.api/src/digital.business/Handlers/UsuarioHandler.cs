using digital.business.Interfaces;
using digital.data.Interfaces;
using digital.domain.InputViewModel;
using digital.domain.OutputViewModel;
using digital.domain.Enums;
using digital.util.Texts;
using System.Threading.Tasks;

namespace digital.business.Handlers
{
    public class UsuarioHandler : IHandlerBase<NewUsuarioInput, NewUsuarioOutputView>
    {
        private readonly IUnitOfWork _uow;

        public UsuarioHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<NewUsuarioOutputView> Execute(NewUsuarioInput data)
        {
            if(!data.IsValid)
                return new NewUsuarioOutputView(data.Notifications,(int) EnumStatusCode.BadRequest, false);


            var exists = await _uow.UsuarioRepository.Exists(data.Email, data.CPF);

            if(exists)
                return new NewUsuarioOutputView(null, (int)EnumStatusCode.BadRequest, false, ValidationsText.EmailCPFJaCadastrado);

            var user = data.Map();

            var result = await _uow.UsuarioRepository.CreateUsuario(user, data.Senha);

            if (result.Succeeded)
                return new NewUsuarioOutputView(null, message: ValidationsText.UsuarioCriadoSucesso);

            else
                return new NewUsuarioOutputView(null, (int)EnumStatusCode.ServerError, message: ValidationsText.ServerError);

        }
    }
}
