using digital.domain.Enums;
using digital.domain.Models;
using Microsoft.AspNetCore.Identity;
using MongoDB.Bson;
using System;
using System.Threading.Tasks;

namespace digital.data.Interfaces
{
    public interface IUsuarioRepository : IDisposable
    {
        public Task<bool> Exists(string email, string cpf);
        public Task<Usuario> GetUsuarioEmail(string email);
        public Task<Usuario> GetUsuarioCpf(string cpf);
        public Task<IdentityResult> CreateUsuario(Usuario usuario, string password, EPapeisNames papel = EPapeisNames.BASIC);
        public Task<bool> CheckPassword(Usuario usuario, string password);
        public Task<Usuario> DisabledUser(ObjectId id);
        public Task<Usuario> DisabledUser(Usuario usuario);
        public Task<IdentityResult> ChangePassword(Usuario user, string currentPass, string newPass);
        public Task<Usuario> GetUsuarioId(string Id);
    }
}
