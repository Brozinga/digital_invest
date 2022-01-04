using digital.assets.Texts;
using digital.domain.Models;
using Flunt.Extensions.Br.Validations;
using Flunt.Notifications;
using Flunt.Validations;

namespace digital.domain.InputViewModel
{
    public class NovoUsuarioInput : BasicInputView
    {
        public NovoUsuarioInput(string nome, string email, string senha, string cPF) : base()
        {
            Nome = nome.ToUpper();
            Email = email.ToLower();
            Senha = senha;
            CPF = cPF.Replace(".", "").Replace("-", "");
        }

        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string CPF { get; set; }

        public override void Validate()
        {
            AddNotifications(
                new Contract<Notification>()
                    .IsEmail(Email, "Email", ErrorText.EmailInvalido)
                    .IsCpf(CPF, "CPF", ErrorText.CPFInvalido)
                    .IsNotNullOrEmpty(Senha, "Senha", ErrorText.SenhaInvalida)
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
