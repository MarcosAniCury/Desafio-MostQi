using portal_web_api.DTOs;

namespace portal_web_api.Models
{
    public class User
    {
        public User(string name, string password, string email, string type)
        {
            this.Id = Guid.NewGuid().ToString();
            this.Name = name;
            this.Email = email;
            this.Password = password;
            this.Type = type;
        }

        public string Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; } 

        public string Password { get; set; }

        public string Type { get; set; }

        public static explicit operator User(UserCreateRequest user)
        {
            return new User(user.Name, user.Password, user.Email, user.Type);
        }
    }
}
