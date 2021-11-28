using digital.business.Interfaces;
using digital.data.Interfaces;
using digital.domain.InputViewModel;
using digital.domain.Responses;
using System.Threading.Tasks;
using digital.assets.Texts;
using Microsoft.Extensions.Hosting;
using System;
using digital.business.Services;
using digital.domain.OutputViewModel;

namespace digital.business.Handlers
{
    public class UsuarioHandler : GenericHandler, IHandlerBase<NewUsuarioInput, BasicResponse>,
        IHandlerBase<ChangePasswordInputView, BasicResponse>,
        IHandlerBase<LoginInputView, BasicResponse>

    {
        private readonly TokenService _jwt;

        public UsuarioHandler(IUnitOfWork uow, IHostEnvironment env, TokenService jwt) : base(uow, env)
        {
            _jwt = jwt;
        }

        public async Task<BasicResponse> Execute(NewUsuarioInput data)
        {
            try
            {
                data.Validate();

                if (!data.IsValid)
                    return BasicResponse.BadRequest(null, data.Notifications);

                var exists = await _uow.UsuarioRepository.Exists(data.Email, data.CPF);

                if (exists)
                    return BasicResponse.BadRequest(ErrorText.EmailCPFJaCadastrado, null);

                var user = data.Map();

                var result = await _uow.UsuarioRepository.CreateUsuario(user, data.Senha);

                if (result.Succeeded)
                    return BasicResponse.OK(SuccessText.UsuarioCriado);

                else
                   return this.InternalServerError();
            }
            catch (Exception ex)
            {
                return this.InternalServerError(ex);
            }
        }

        public async Task<BasicResponse> Execute(ChangePasswordInputView data)
        {
            try
            {
                data.Validate();

                if (!data.IsValid)
                    return BasicResponse.BadRequest(null, data.Notifications);

                var user = await _uow.UsuarioRepository.GetUsuarioId(data.Id);

                if (user == null)
                    return BasicResponse.BadRequest(ErrorText.UsuarioNaoExiste);

                var result = await _uow.UsuarioRepository.ChangePassword(user, data.SenhaAtual, data.NovaSenha);

                if (result.Succeeded)
                    return BasicResponse.OK(SuccessText.SenhaAlterada);

                else
                    return this.InternalServerError();
            }
            catch (Exception ex)
            {
                return this.InternalServerError(ex);
            }
        }

        public async Task<BasicResponse> Execute(LoginInputView data)
        {
            try
            {
                data.Validate();

                if (!data.IsValid)
                    return BasicResponse.BadRequest(null, data.Notifications);

                var user = await _uow.UsuarioRepository.GetUsuarioEmail(data.Email);

                if (user == null)
                    return BasicResponse.BadRequest(ErrorText.UsuarioNaoExiste);

                var checkPass = await _uow.UsuarioRepository.CheckPassword(user, data.Senha);

                if (!checkPass)
                    return BasicResponse.BadRequest(ErrorText.UsuarioNaoExiste);

                var result = _jwt.GenerateToken(user);

                return BasicResponse.OK(null, new LoginOutputView(data.Email.ToLower(), result.ExpireTime.Value, result.Token));

            }
            catch (Exception ex)
            {
                return this.InternalServerError(ex);                
            }
        }



        private BasicResponse InternalServerError()
        {
            return BasicResponse.ServerError(_env.IsDevelopment());
        }
        private BasicResponse InternalServerError(Exception ex)
        {
            return BasicResponse.ServerError(_env.IsDevelopment(), ex);
        }
    }
}
