using digital.domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace digital.service.Middlewares
{
    public class TokenService
    {
        private readonly IConfiguration configuration;
        private readonly RoleManager<Papel> _papeisManager;

        public TokenService(IConfiguration configuration, RoleManager<Papel> papeisManager)
        {
            this.configuration = configuration;
            _papeisManager = papeisManager;
        }

        public string GenerateToken(Usuario user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(configuration.GetSection("Jwt:Secret").Value);
            var role = "basic";

            if (user.Roles.Count > 0)
                role = _papeisManager.FindByIdAsync(user.Roles.First().ToString()).Result.Name;

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Email.ToString()),
                    new Claim(ClaimTypes.Role, role)
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
