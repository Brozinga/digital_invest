using System;

namespace digital.domain.Authentication
{
    public class TokenModel
    {
        public TokenModel(string token, TimeSpan? expireTime)
        {
            Token = token;
            ExpireTime = expireTime;
        }

        public string Token { get; }

        public TimeSpan? ExpireTime { get; }
    }
}
