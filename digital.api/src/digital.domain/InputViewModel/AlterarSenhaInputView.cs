using digital.assets.Texts;
using Flunt.Notifications;
using Flunt.Validations;

namespace digital.domain.InputViewModel
{
    public class AlterarSenhaInputView : BasicInputView
    {
        public string Id { get; set; }
        public string SenhaAtual { get; set; }
        public string NovaSenha { get; set; }

        public override void Validate()
        {
            AddNotifications(
                new Contract<Notification>()
                    .IsNotNullOrEmpty(SenhaAtual, "SenhaAtual", ErrorText.SenhaInvalida)
                    .IsNotNullOrEmpty(NovaSenha, "NovaSenha", ErrorText.SenhaInvalida)
                    .AreNotEquals(SenhaAtual, NovaSenha, "Senha", ErrorText.SenhasIguais)
                );
        }
    }
}
