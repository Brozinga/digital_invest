using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;

namespace digital.ioc
{
    public static class Policies
    {
        public static void InjectPolicies(this IServiceCollection services, List<PolicyItem> policies)
        {
            var authorizationConf = new AuthorizationOptions();

            foreach (var item in policies)
            {
                authorizationConf.AddPolicy(item.Name, p => p.RequireRole(item.Value.Split(",")));
            }

            services.AddAuthorization(configure => configure = authorizationConf);
        }
    }

    public class PolicyItem
    {
        public string Name { get; set; }
        public string Value { get; set; }
    }
}
