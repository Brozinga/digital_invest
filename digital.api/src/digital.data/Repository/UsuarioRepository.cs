using AspNetCore.Identity.Mongo.Mongo;
using digital.data.DbContext;
using digital.data.Interfaces;
using digital.domain.Enums;
using digital.domain.Models;
using digital.util.Extensions;
using Microsoft.AspNetCore.Identity;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Threading.Tasks;

namespace digital.data.Repository
{
    public class UsuarioRepository : GenericRepository, IUsuarioRepository
    {
        private readonly UserManager<Usuario> _userManager;
        private readonly RoleManager<Papel> _papeisManager;

        public UsuarioRepository(MongoDbContext dbContext, UserManager<Usuario> userManager, RoleManager<Papel> papeisManager)
            : base(dbContext)
        {
            _userManager = userManager;
            _papeisManager = papeisManager;
        }

        public async Task<bool> VerificarSenha(Usuario usuario, string senha)
        {
            return await _userManager.CheckPasswordAsync(usuario, senha);
        }

        public async Task<IdentityResult> AtualizarSenha(Usuario usuario, string senhaAtual, string senhaNova)
        {
            var usuarioDb = await _userManager.ChangePasswordAsync(usuario, senhaAtual, senhaNova);
            return usuarioDb;
        }

        public async Task<IdentityResult> CriarUsuario(Usuario usuario, string senha, EPapeisNomes papel = EPapeisNomes.BASIC)
        {
            var res = papel.ToDescriptionString();
            var papelSelecionado = await _papeisManager.FindByNameAsync(res);
            usuario.AddRole(papelSelecionado.Id);
            var usuarioCriado = await _userManager.CreateAsync(usuario, senha);

            return usuarioCriado;
        }

        public async Task<Usuario> DesabilitarUsuario(ObjectId id)
        {
            var usuario = await _dbContext.Usuarios.FirstOrDefaultAsync(x => x.Id == id && x.Ativo == true);
            usuario.Ativo = false;
            var replace = await _dbContext.Usuarios.FindOneAndReplaceAsync(x => x.Id == usuario.Id, usuario);

            return replace;
        }

        public async Task<Usuario> DesabilitarUsuario(Usuario usuario)
        {
            usuario.Ativo = false;
            var replace = await _dbContext.Usuarios.FindOneAndReplaceAsync(x => x.Id == usuario.Id, usuario);

            return replace;
        }

        public async Task<bool> Existe(string email, string cpf)
        {
            var usuario = await _dbContext.Usuarios.FirstOrDefaultAsync(x => x.Email.ToLower() == email.ToLower() || x.CPF == cpf);
            if (usuario == null) return false;

            return true;
        }

        public async Task<Usuario> PegarUsuarioCpf(string cpf)
        {
            var usuario = await _dbContext.Usuarios.FirstOrDefaultAsync(x => x.CPF == cpf && x.Ativo == true);
            return usuario;
        }

        public async Task<Usuario> PegarUsuarioEmail(string email)
        {
            var usuario = await _dbContext.Usuarios.FirstOrDefaultAsync(x => x.Email.ToLower() == email.ToLower() && x.Ativo == true);
            return usuario;
        }

        public async Task<Usuario> PegarUsuarioId(ObjectId Id)
        {
            var usuario = await _dbContext.Usuarios.FirstOrDefaultAsync(x => x.Id == Id && x.Ativo == true);
            return usuario;
        }

        public async Task<ReplaceOneResult> AtualizarUsuario(Usuario data)
        {
            var usuario = await _dbContext.Usuarios.ReplaceOneAsync(x => x.Id == data.Id, data);
            return usuario;
        }
    }
}
