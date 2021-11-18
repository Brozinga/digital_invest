using digital.domain.Enums;

namespace digital.domain.OutputViewModel
{
    public class NewUsuarioOutputView : BasicOutputView<object>
    {
        public NewUsuarioOutputView (object result, EStatusCode status = EStatusCode.Ok, bool success = true, string message = null) 
            : base(result, status, success, message)
        {
        }
    }
}
