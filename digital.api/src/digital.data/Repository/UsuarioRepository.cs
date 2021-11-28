using AspNetCore.Identity.Mongo.Mongo;
using digital.data.DbContext;
using digital.data.Interfaces;
using digital.domain.Enums;
using digital.domain.Models;
using digital.util.Extensions;
using Microsoft.AspNetCore.Identity;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Threading.Tasks;

namespace digital.data.Repository
{
    public class UsuarioRepository : GenericRepository, IUsuarioRepository
    {
        private readonly UserManager<Usuario> _userManager;
        private readonly RoleManager<Papel> _papeisManager;

        public UsuarioRepository(MongoDbContext dbContext, UserManager<Usuario> userManager, RoleManager<Papel> papeisManager)
            :base(dbContext)
        {
            _userManager = userManager;
            _papeisManager = papeisManager;
        }

        public async Task<bool> CheckPassword(Usuario usuario, string password)
        {
            return await _userManager.CheckPasswordAsync(usuario, password);
        }

        public async Task<IdentityResult> ChangePassword(Usuario user, string currentPass, string newPass)
        {
            var usuario = await _userManager.ChangePasswordAsync(user, currentPass, newPass);   
            
            return usuario;
        }

        public async Task<IdentityResult> CreateUsuario(Usuario usuario, string password, EPapeisNames papel = EPapeisNames.BASIC)
        {
            var res = papel.ToDescriptionString();

            var papelSelecionado = await _papeisManager.FindByNameAsync(res);

            usuario.AddRole(papelSelecionado.Id);

            var usuarioCriado = await _userManager.CreateAsync(usuario, password);

            return usuarioCriado;
        }

        public async Task<Usuario> DisabledUser(ObjectId id)
        {
            var usuario = await _dbContext.Usuarios.FirstOrDefaultAsync(x => x.Id == id && x.Ativo == true);

            usuario.Ativo = false;

            var replace = await _dbContext.Usuarios.FindOneAndReplaceAsync(x => x.Id == usuario.Id, usuario);

            return replace;
        }

        public async Task<Usuario> DisabledUser(Usuario usuario)
        {
            usuario.Ativo = false;

            var replace = await _dbContext.Usuarios.FindOneAndReplaceAsync(x => x.Id == usuario.Id, usuario);

            return replace;
        }

        public async Task<bool> Exists(string email, string cpf)
        {
            var usuario = await _dbContext.Usuarios.FirstOrDefaultAsync(x => x.Email.ToLower() == email.ToLower() || x.CPF == cpf);

            if (usuario == null) return false;

            return true;
        }

        public async Task<Usuario> GetUsuarioCpf(string cpf)
        {
            var usuario = await _dbContext.Usuarios.FirstOrDefaultAsync(x => x.CPF == cpf && x.Ativo == true);
            return usuario;
        }

        public async Task<Usuario> GetUsuarioEmail(string email)
        {
            throw new Exception("Deu ruim, teste!");
            var usuario = await _dbContext.Usuarios.FirstOrDefaultAsync(x => x.Email.ToLower() == email.ToLower() && x.Ativo == true);
            return usuario;
        }

        public async Task<Usuario> GetUsuarioId(string Id)
        {
            var usuario = await _dbContext.Usuarios.FirstOrDefaultAsync(x => x.Id == ObjectId.Parse(Id) && x.Ativo == true);
            return usuario;
        }
    }
}
