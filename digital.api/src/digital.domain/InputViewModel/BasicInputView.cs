using Flunt.Notifications;

namespace digital.domain.InputViewModel
{
    public abstract class BasicInputView : Notifiable<Notification>
    {

        public abstract void Validate();
    }
}
