using portal_web_api.Models;
using System.Text.Json.Serialization;

namespace portal_web_api.DTOs
{
    public class UserLoginResponse
    {
        public UserLoginResponse(bool success, DateTime tokenExpiredTime)
        {
            this.Success = success;
            this.TokenExpirationTime = tokenExpiredTime;
        }

        public bool Success { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public User data { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string Token { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public DateTime? TokenExpirationTime { get; set; }
    }
}
