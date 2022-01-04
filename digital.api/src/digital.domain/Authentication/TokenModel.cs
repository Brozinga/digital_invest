using System;

namespace digital.domain.Authentication
{
    public class TokenModel
    {
        public TokenModel(string token, DateTime? expireTime)
        {
            Token = token;
            ExpireTime = expireTime;
        }

        public string Token { get; }

        public DateTime? ExpireTime { get; }
    }
}
