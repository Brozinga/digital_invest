using System;

namespace digital.domain.OutputViewModel
{
    public class LoginOutputView
    {
        public LoginOutputView(string email, TimeSpan dataExpiracao, string token)
        {
            Email = email;
            DataExpiracao = dataExpiracao;
            Token = token;
        }

        public string Email { get; }
        public TimeSpan DataExpiracao { get; }
        public string Token { get; }
    }
}
