using digital.domain.Enums;
using System.Text.Json.Serialization;

namespace digital.domain.Responses
{
    public abstract class GenericResponse<T> where T : class
    {
        public GenericResponse(T result, EStatusCode status = EStatusCode.Ok, bool success = true, string message = null)
        {
            Status = status;
            Result = result;
            Message = message;
            Success = success;
        }
        public EStatusCode Status { get; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public T Result { get; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string Message { get; }
        public bool Success { get; }
    }
}
