namespace portal_web_api.Models
{
    public class User
    {
        public User(string name, string password, string email)
        {
            this.Id = Guid.NewGuid().ToString();
            this.Name = name;
            this.Email = email;
            this.Password = password;
        }

        public string Id { get; private set; }

        public string Name { get; private set; }

        public string Email { get; private set; } 

        public string Password { get; private set; }
    }
}
