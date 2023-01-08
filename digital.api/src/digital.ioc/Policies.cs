using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;

namespace digital.ioc
{
    public static class Policies
    {
        public static void InjectPolicies(this IServiceCollection services, PolicyItem[] policies)
        {
            var authorizationConf = new AuthorizationOptions();

            services.AddAuthorization(configure =>
            {
                foreach (var item in policies)
                {
                    configure.AddPolicy(item.Name, p => p.RequireRole(item.Value.Split(",")));
                }
            });
        }
    }

    public class PolicyItem
    {
        public string Name { get; set; }
        public string Value { get; set; }
    }
}
