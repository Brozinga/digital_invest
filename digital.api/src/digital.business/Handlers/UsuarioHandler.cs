using digital.business.Interfaces;
using digital.data.Interfaces;
using digital.domain.InputViewModel;
using digital.domain.OutputViewModel;
using digital.domain.Enums;
using System.Threading.Tasks;
using digital.assets.Texts;

namespace digital.business.Handlers
{
    public class UsuarioHandler : IHandlerBase<NewUsuarioInput, BasicObjectOutputView>,
        IHandlerBase<ChangePasswordInputView, BasicObjectOutputView>
    {
        private readonly IUnitOfWork _uow;

        public UsuarioHandler(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public async Task<BasicObjectOutputView> Execute(NewUsuarioInput data)
        {
            if(!data.IsValid)
                return BasicObjectOutputView.BadRequest(null, data.Notifications);


            var exists = await _uow.UsuarioRepository.Exists(data.Email, data.CPF);

            if(exists)
                return BasicObjectOutputView.BadRequest(ErrorText.EmailCPFJaCadastrado, null);

            var user = data.Map();

            var result = await _uow.UsuarioRepository.CreateUsuario(user, data.Senha);

            if (result.Succeeded)
                return BasicObjectOutputView.OK(SuccessText.UsuarioCriadoSucesso);

            else
                return BasicObjectOutputView.ServerError();

        }

        public async Task<BasicObjectOutputView> Execute(ChangePasswordInputView data)
        {
            data.Validate();
            if (!data.IsValid)
                return BasicObjectOutputView.BadRequest(null, data.Notifications);

            var user = await _uow.UsuarioRepository.GetUsuarioId(data.Id);

            if (user == null)
                return BasicObjectOutputView.BadRequest(ErrorText.UsuarioNaoExiste);

            var result = await _uow.UsuarioRepository.ChangePassword(user, data.SenhaAtual, data.NovaSenha);

            if (result.Succeeded)
                return BasicObjectOutputView.OK(SuccessText.SenhaAlterada);

            else
                return BasicObjectOutputView.ServerError();
        }
    }
}
