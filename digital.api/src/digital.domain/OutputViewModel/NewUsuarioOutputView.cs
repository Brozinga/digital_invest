namespace digital.domain.OutputViewModel
{
    public class NewUsuarioOutputView : BasicOutputView<object>
    {
        public NewUsuarioOutputView (object result, int status = 200, bool success = true, string message = null) 
            : base(result, status, success, message)
        {
        }
    }
}
