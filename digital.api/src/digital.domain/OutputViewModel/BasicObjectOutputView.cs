using digital.assets.Texts;
using digital.domain.Enums;
using System;

namespace digital.domain.OutputViewModel
{
    public class BasicObjectOutputView : BasicOutputView<object>
    {
        public BasicObjectOutputView(object result, EStatusCode status = EStatusCode.Ok, bool success = true, string message = null)
           : base(result, status, success, message)
        {
        }

        public static BasicObjectOutputView BadRequest(string message, object result = null)
        {
            return new BasicObjectOutputView(result, EStatusCode.BadRequest, false, message);
        }

        public static BasicObjectOutputView ServerError(string message = null, object error = null)
        {
            var uuid = Guid.NewGuid();
            return new BasicObjectOutputView(error, EStatusCode.ServerError, false, $"{message ?? ErrorText.ErroServidor} - ID_ERRO: {uuid}");
        }

        public static BasicObjectOutputView OK(string message, object error = null)
        {
            return new BasicObjectOutputView(error, EStatusCode.Ok, true, message);
        }

    }
}
