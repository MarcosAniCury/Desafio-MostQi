using System.ComponentModel.DataAnnotations;

namespace MostQuotation.DTOs
{
    public class UserLoginRequest
    {
        public UserLoginRequest(string name, string password)
        {
            Name = name;
            Password = password;
        }

        [Required(ErrorMessage = "O campo nome é obrigatório")]
        public string Name { get; private set; }

        [Required(ErrorMessage = "O campo senha é obrigatório")]
        [StringLength(50, ErrorMessage = "O campo senha deve ter entre {2} e {1} caracteres", MinimumLength = 6)]
        public string Password { get; private set; }
    }
}
