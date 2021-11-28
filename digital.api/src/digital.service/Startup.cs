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

namespace digital.service
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
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
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "digital.service", Version = "v1" });

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please insert JWT with Bearer into field",
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
                      new string[] { }
                    }
                  });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "digital.service v1"));
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
