using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace digital.domain.OutputViewModel
{
    public class BasicOutputView<T> where T : class
    {
        public BasicOutputView(T result, int status = 200, bool success = true, string message = null)
        {
            Status = status;
            Result = result;
            Message = message;
            Success = success;
        }
        public int Status { get; }
        public T Result { get; }
        public string Message { get; }
        public bool Success { get; }
    }
}
