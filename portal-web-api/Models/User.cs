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
            this.CreatedAt = DateTime.Now;
        }

        public User(string name, string password, string email, string type, string rg, string dateOfBirth, string documentFront, string documentBack, string selfie)
        {
            this.Id = Guid.NewGuid().ToString();
            this.Name = name;
            this.Email = email;
            this.Password = password;
            this.Type = type;
            this.RG = rg;
            this.DateOfBirth = DateTime.Parse(dateOfBirth);
            this.DocumentFront = documentFront;
            this.DocumentBack = documentBack;
            this.Selfie = selfie;
            this.CreatedAt = DateTime.Now;
        }

        public string Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; } 

        public string Password { get; set; }

        public string Type { get; set; }
        
        public string? RG { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public string? DocumentFront { get; set; }

        public string? DocumentBack { get; set; }

        public string? Selfie { get; set; }

        public DateTime? CreatedAt { get; set; }

        public static explicit operator User(UserCreateRequest user)
        {
            return new User(user.Name, user.Password, user.Email, user.Type);
        }

        public static explicit operator User(ClientCreateRequest user)
        {
            return new User(
                user.Name, 
                user.Password, 
                user.Email, 
                "client", 
                user.RG,
                user.DateOfBirth, 
                user.DocumentFront, 
                user.DocumentBack, 
                user.Selfie
            );
        }
    }
}
