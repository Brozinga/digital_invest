using digital.domain.OutputViewModel;
using System.Threading.Tasks;

namespace digital.business.Interfaces
{
    public interface IHandlerBase<in I, T> where T : BasicOutputView<object>
    {
        Task<T> Execute(I data);
    }
}
