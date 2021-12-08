using System;

namespace digital.domain.OutputViewModel
{
    public class LoginOutputView
    {
        public LoginOutputView(string email, string nome, decimal carteira, string token, TimeSpan dataExpiracao)
        {
            Email = email;
            DataExpiracao = dataExpiracao;
            Token = token;
            Nome = nome;
            Carteira = carteira;
        }

        public string Nome { get; }
        public decimal Carteira { get; }
        public string Email { get; }
        public TimeSpan DataExpiracao { get; }
        public string Token { get; }
    }
}
