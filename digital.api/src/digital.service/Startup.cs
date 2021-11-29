using AspNetCore.Identity.Mongo;
using digital.data.DbContext;
using digital.data.Identity;
using digital.domain.Models;
using digital.ioc;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using MongoDB.Bson;
using System;
using System.IO;
using System.Reflection;

namespace digital.service
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {

            string ConnectionString = Configuration.GetSection("MongoConnection:ConnectionString").Value;
            string DatabaseName = Configuration.GetSection("MongoConnection:Database").Value;

            MongoDbContext.ConnectionString = ConnectionString;
            MongoDbContext.DatabaseName = DatabaseName;
            MongoDbContext.IsSSL = Convert.ToBoolean(this.Configuration.GetSection("MongoConnection:IsSSL").Value);

            services.AddIdentity<Usuario, Papel>(IdentityConfiguration.GetDefault())
                .AddRoles<Papel>()
                .AddMongoDbStores<Usuario, Papel, ObjectId>(
                    ConnectionString, DatabaseName
                );

            services.InjectDatabase();
            services.InjectHandlers();
            services.InjectRepositories();
            services.InjectUnitOfWork();

            services.InjectServices();

            services.InjectJWT(Configuration.GetSection("JWT:Secret").Value);

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { 
                    Title = "Digital Invest API", 
                    Version = "v1",
                    Description = "API de serviços para o Front-End da aplicação Digital Invest essa API é responsável pelo controle de acessos," +
                    "controle de usuários, controle das contas e por fim controle das compras de moedas"
                });

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Por favor insira o JWT e não se esqueça de escrever 'Bearer' com o espaço",
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement {
                   {
                     new OpenApiSecurityScheme
                     {
                       Reference = new OpenApiReference
                       {
                         Type = ReferenceType.SecurityScheme,
                         Id = "Bearer"
                       }
                      },
                      Array.Empty<string>()
                    }
                  });

                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Digital Invest API v1"));
            }
           
            app.UseHttpsRedirection();
            app.UseRouting();

            app.UseCors(x => x
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
