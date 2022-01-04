using digital.assets.Texts;
using digital.domain.Enums;
using digital.domain.OutputViewModel;
using System;

namespace digital.domain.Responses
{
    public class BasicResponse : GenericResponse<object>
    {
        public BasicResponse(object result, EStatusCode status = EStatusCode.Ok, bool success = true, string message = null) :
            base(result, status, success, message)
        {
        }

        public static BasicResponse BadRequest(string message, object result = null)
        {
            return new BasicResponse(result, EStatusCode.BadRequest, false, message);
        }

        public static BasicResponse NotFound(string message, object result = null)
        {
            return new BasicResponse(result, EStatusCode.NotFound, false, message);
        }

        public static BasicResponse OK(string message, object result = null)
        {
            return new BasicResponse(result, EStatusCode.Ok, true, message);
        }

        public static BasicResponse ServerError(bool isDevelopment = false, Exception error = null, string message = null)
        {
            error ??= new Exception(message ?? ErrorText.ErroServidor);

            var errorMessage = new ServerErrorOutputView(error?.InnerException?.Message ?? error.Message,
                                                  error?.Source,
                                                  error.StackTrace);
            if (isDevelopment)
            {

                return new BasicResponse(
                           errorMessage,
                            EStatusCode.ServerError, false, $"{error}, ERROR_ID: {errorMessage.ErrorID}");
            }


            return new BasicResponse(
                        errorMessage,
                        EStatusCode.ServerError, false, $"{error}, ERROR_ID: {errorMessage.ErrorID}");

            // return new BasicResponse(
            //                 new ServerErrorOutputView(null,
            //                                           null,
            //                                           null),
            //                 EStatusCode.ServerError, false, $"{ErrorText.ErroServidor}, ERROR_ID: {errorMessage.ErrorID}");

        }
    }
}
