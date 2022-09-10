using System.Text.Json.Serialization;

namespace portal_web_api.Models
{
    public class UserLoginResponse
    {
        public bool Success { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string Token { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public DateTime? ExpirationTime { get; set; }
    }
}
