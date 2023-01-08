using digital.util.Filters;
using Microsoft.AspNetCore.Mvc;

namespace digital.util.Attributes
{
    public class AuthorizeMultiplePolicyAttribute : TypeFilterAttribute
    {
        public AuthorizeMultiplePolicyAttribute(string policies, bool IsAll) : base(typeof(AuthorizeMultiplePolicyFilter))
        {
            Arguments = new object[] { policies, IsAll };
        }
    }
}
