using digital.data.Interfaces;
using digital.domain.Responses;
using Microsoft.Extensions.Hosting;
using System;

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

        protected virtual BasicResponse InternalServerError()
        {
            return BasicResponse.ServerError(_env.IsDevelopment());
        }
        protected virtual BasicResponse InternalServerError(Exception ex)
        {
            return BasicResponse.ServerError(_env.IsDevelopment(), ex);
        }
    }
}
