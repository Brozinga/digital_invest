using digital.assets.Texts;
using Flunt.Notifications;
using Flunt.Validations;

namespace digital.domain.InputViewModel
{
    public class LoginInputView : BasicInputView
    {
        public string Email { get; set; }
        public string Senha { get; set; }

        public override void Validate()
        {
            AddNotifications(
                new Contract<Notification>()
                    .IsEmail(Email, "Email", ErrorText.EmailInvalido)
                    .IsNotNullOrEmpty(Email, "Email", ErrorText.EmailVazio)
                    .IsNotNullOrEmpty(Senha, "Senha", ErrorText.SenhaInvalida)
                );
        }
    }
}
