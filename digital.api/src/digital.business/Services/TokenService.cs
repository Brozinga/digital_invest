using digital.domain.Authentication;
using digital.domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace digital.business.Services
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

        public TokenModel GenerateToken(Usuario user)
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
                    new Claim(ClaimTypes.Sid, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email.ToString()),
                    new Claim(ClaimTypes.Role, role)
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return new TokenModel(tokenHandler.WriteToken(token), tokenDescriptor.Expires);
        }

        public AuthenticationModel DecodeToken(string token)
        {
            token = CleanToken(token);
            var key = Encoding.ASCII.GetBytes(configuration.GetSection("Jwt:Secret").Value);

            var handler = new JwtSecurityTokenHandler();
            //var tokenSecure = handler.ReadToken(token) as SecurityToken;
            SecurityToken tokenSecure = null;
            var validations = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false
            };
            var claims = handler.ValidateToken(token, validations, out tokenSecure);

            if(claims != null) { 

                    return new AuthenticationModel
                    {
                        Id = claims.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Sid)?.Value ?? "",
                        Role = claims.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "",
                        Email = claims.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Name)?.Value ?? "",
                    };
            }
            return null;
        }

        public Dictionary<string, string> DecodeClaimsToDictionary(string token)
        {
            token = CleanToken(token);
            var claimsInformation = new Dictionary<string, string>();

            var key = Encoding.ASCII.GetBytes(configuration.GetSection("Jwt:Secret").Value);

            var handler = new JwtSecurityTokenHandler();
            SecurityToken tokenSecure = null;
            var validations = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false
            };
            var claims = handler.ValidateToken(token, validations, out tokenSecure);

            if (claims != null)
            {
                foreach (var info in claims.Claims)
                {
                    claimsInformation.Add(info.Type, info.Value);
                }

                return claimsInformation;

            }
            return null;
        }

        private string CleanToken(string token)
        {
            return token.Replace("Bearer ", "");
        }
    }
}
