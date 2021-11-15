namespace digital.domain.InputViewModel
{
    public class LoginInputView : BasicInputView
    {
        public string user { get; set; }
        public string password { get; set; }

        public override void Validate()
        {
            throw new System.NotImplementedException();
        }
    }
}
