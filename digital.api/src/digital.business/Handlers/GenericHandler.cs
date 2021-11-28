using digital.data.Interfaces;
using Microsoft.Extensions.Hosting;

namespace digital.business.Handlers
{
    public abstract class GenericHandler
    {
        protected readonly IUnitOfWork _uow;
        protected readonly IHostEnvironment _env;

        public GenericHandler(IUnitOfWork uow, IHostEnvironment env)
        {
            _uow = uow;
            _env = env;
        }
    }
}
