using digital.domain.Responses;
using System.Threading.Tasks;

namespace digital.business.Interfaces
{
    public interface IHandlerBase<in I, T> where T : GenericResponse<object>
    {
        Task<T> Executar(I data);
    }
}
