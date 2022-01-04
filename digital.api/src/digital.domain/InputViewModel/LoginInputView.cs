using digital.assets.Texts;
using digital.util.Extensions;
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
            this.TrimAllStrings();

            AddNotifications(
                new Contract<Notification>()
                    .IsEmail(Email, "Email", ErrorText.EmailInvalido)
                    .IsNotNullOrEmpty(Email, "Email", ErrorText.EmailVazio)
                    .IsNotNullOrEmpty(Senha, "Senha", ErrorText.SenhaInvalida)
                );
        }
    }
}
