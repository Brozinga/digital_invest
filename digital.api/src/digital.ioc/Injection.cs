using digital.business.Handlers;
using digital.business.Services;
using digital.data.DbContext;
using digital.data.Interfaces;
using digital.data.Repository;
using digital.data.UnitOfWork;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.HttpLogging;

namespace digital.ioc
{
    public static class Injection
    {
        public static void InjectDatabase(this IServiceCollection services)
        {
            services.AddScoped(typeof(MongoDbContext));
        }
        public static void InjectHandlers(this IServiceCollection services)
        {
            services.AddScoped<UsuarioHandler>();
            services.AddScoped<MoedaHandler>();
            services.AddScoped<CotacaoHandler>();
            services.AddScoped<PedidoHandler>();
        }
        public static void InjectRepositories(this IServiceCollection services)
        {
            services.AddScoped<IUsuarioRepository, UsuarioRepository>();
            services.AddScoped<IMoedaRepository, MoedaRepository>();
            services.AddScoped<IPedidoRepository, PedidoRepository>();
            services.AddScoped<ICotacaoRepository, CotacaoRepository>();
            services.AddScoped<IHistoricoCarteiraRepository, HistoricoCarteiraRepository>();
        }
        public static void InjectUnitOfWork(this IServiceCollection services)
        {
            services.AddScoped<IUnitOfWork, UnitOfWork>();
        }
        public static void InjectServices(this IServiceCollection services)
        {
            services.AddScoped<TokenService>();
        }
        public static void InjectJWT(this IServiceCollection services, string secret)
        {
            var key = Encoding.ASCII.GetBytes(secret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
        }
        
        public static void InjectLogger(this IServiceCollection services)
        {
            services.AddHttpLogging(httpLogging =>
            {
                httpLogging.LoggingFields = HttpLoggingFields.RequestPropertiesAndHeaders |
                                            HttpLoggingFields.RequestBody;
                httpLogging.MediaTypeOptions.
                    AddText("application/javascript");
                httpLogging.RequestBodyLogLimit = 4096;
                httpLogging.ResponseBodyLogLimit = 4096;
            });
        }
    }
}
