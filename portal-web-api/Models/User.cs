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

        public string Id { get; private set; }

        public string Name { get; private set; }

        public string Email { get; private set; } 

        public string Password { get; private set; }

        public string Type { get; private set; }

        public static explicit operator User(UserRequest user)
        {
            return new User(user.Name, user.Password, user.Email, user.Type);
        }
    }
}
