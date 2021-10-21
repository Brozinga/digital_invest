using digital.data.DbContext;
using Microsoft.Extensions.DependencyInjection;

namespace digital.ioc
{
    public static class Injection
    {
        public static void InjectDatabase(this IServiceCollection services)
        {
            services.AddScoped(typeof(MongoDbContext));
        }

    }
}
