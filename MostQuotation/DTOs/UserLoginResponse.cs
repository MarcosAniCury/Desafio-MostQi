using MostQuotation.Models;
using System.Text.Json.Serialization;

namespace MostQuotation.DTOs
{
    public class UserLoginResponse
    {
        public UserLoginResponse(bool success)
        {
            this.Success = success;
        }

        public bool Success { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public User Data { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public object Token { get; set; }
    }
}
