using Microsoft.AspNetCore.Identity;
using System;

namespace digital.data.Identity
{
    public class IdentityConfiguration
    {
        public IdentityConfiguration()
        {

        }

        public static Action<IdentityOptions> GetDefault()
        {
            return options =>
            {
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 4;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;

                options.SignIn.RequireConfirmedAccount = false;
                options.SignIn.RequireConfirmedEmail = false;
                options.SignIn.RequireConfirmedPhoneNumber = false;

                options.Lockout.MaxFailedAccessAttempts = 10;

                options.User.RequireUniqueEmail = true;
            };
        }
    }
}
