using System;

namespace digital.domain.OutputViewModel
{
    public class LoginOutputView
    {
        public LoginOutputView(string email, string nome, double carteira, string token, DateTime? dataExpiracao)
        {
            Email = email;
            DataExpiracao = dataExpiracao;
            Token = token;
            Nome = nome;
            Carteira = carteira;
        }

        public string Nome { get; }
        public double Carteira { get; }
        public string Email { get; }
        public DateTime? DataExpiracao { get; }
        public string Token { get; }
    }
}
