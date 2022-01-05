using digital.domain.Enums;
using digital.domain.Models;
using Microsoft.AspNetCore.Identity;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Threading.Tasks;

namespace digital.data.Interfaces
{
    public interface IUsuarioRepository : IDisposable
    {
        public Task<bool> Existe(string email, string cpf);
        public Task<bool> Existe(ObjectId id);
        public Task<Usuario> PegarUsuarioEmail(string email);
        public Task<Usuario> PegarUsuarioCpf(string cpf);
        public Task<IdentityResult> CriarUsuario(Usuario usuario, string senha, EPapeisNomes papel = EPapeisNomes.BASIC);
        public Task<bool> VerificarSenha(Usuario usuario, string senha);
        public Task<Usuario> DesabilitarUsuario(ObjectId id);
        public Task<Usuario> DesabilitarUsuario(Usuario usuario);
        public Task<IdentityResult> AtualizarSenha(Usuario usuario, string senhaAtual, string senhaNova);
        public Task<Usuario> PegarUsuarioId(ObjectId Id);
        public Task<ReplaceOneResult> AtualizarUsuario(Usuario usuario);
    }
}
