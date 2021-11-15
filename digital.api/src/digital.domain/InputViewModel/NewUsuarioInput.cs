using digital.domain.Models;
using digital.util;
using Flunt.Extensions.Br.Validations;
using Flunt.Notifications;
using Flunt.Validations;
using System;

namespace digital.domain.InputViewModel
{
    public class NewUsuarioInput : BasicInputView
    {
        public NewUsuarioInput(string nome, string email, string senha, string cPF)
        {
            Nome = nome;
            Email = email.ToLower();
            Senha = senha;
            CPF = cPF;
            Validate();
        }

        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string CPF { get; set; }

        public override void Validate()
        {
            AddNotifications(
                new Contract<Notification>()
                    .IsEmail(Email, "Email", ValidationsText.EmailInvalid)
                    .IsCpf(CPF, "CPF", ValidationsText.CPFInvalid)
                    .IsNotNullOrEmpty(Senha, "Senha", ValidationsText.SenhaInvalid)
                );
        }

        public Usuario Map()
        {
            return new Usuario
            {
                Nome = this.Nome,
                Email = this.Email,
                UserName = this.Email,
                CPF = this.CPF,
                Ativo = true
            };
        } 
    }
}
