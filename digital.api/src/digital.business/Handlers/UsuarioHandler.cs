using AspNetCore.Identity.Mongo.Mongo;
using digital.business.Interfaces;
using digital.data.DbContext;
using digital.domain.InputViewModel;
using digital.domain.Models;
using digital.domain.OutputViewModel;
using digital.util;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace digital.business.Handlers
{
    public class UsuarioHandler : IHandlerBase<NewUsuarioInput, NewUsuarioOutputView>
    {
        private readonly MongoDbContext _dbContext;
        private readonly UserManager<Usuario> _userManager;
        private readonly RoleManager<Papel> _papeisManager;

        public UsuarioHandler(MongoDbContext dbContext, UserManager<Usuario> userManager, RoleManager<Papel> papeisManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
            _papeisManager = papeisManager;
        }

        public async Task<NewUsuarioOutputView> Execute(NewUsuarioInput data)
        {
            if(!data.IsValid)
                return new NewUsuarioOutputView(data.Notifications,(int) EnumStatusCode.BadRequest, false);


            var exists = await _dbContext.Usuarios.FirstOrDefaultAsync(x => x.Email == data.Email || x.CPF == data.CPF);

            if(exists != null)
                return new NewUsuarioOutputView(null, (int)EnumStatusCode.BadRequest, false, ValidationsText.EmailCPFJaCadastrado);


            var papel = await _papeisManager.FindByNameAsync("basic");
            var user = data.Map();

            user.Roles.Add(papel.Id);

            var result = await _userManager.CreateAsync(user, data.Senha);

            if (result.Succeeded)
                return new NewUsuarioOutputView(null, message: ValidationsText.UsuarioCriadoSucesso);

            else
                return new NewUsuarioOutputView(null, (int)EnumStatusCode.ServerError, message: ValidationsText.ServerError);

        }
    }
}
