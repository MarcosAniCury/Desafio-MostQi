﻿using portal_web_api.Models;
using System.Text.Json.Serialization;

namespace portal_web_api.DTOs
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