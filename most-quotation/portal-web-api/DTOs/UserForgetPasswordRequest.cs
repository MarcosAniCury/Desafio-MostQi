using System.ComponentModel.DataAnnotations;

namespace portal_web_api.DTOs
{
    public class UserForgetPasswordRequest
    {
        public UserForgetPasswordRequest(string name, string email)
        {
            Name = name;
            Email = email;
        }

        [Required(ErrorMessage = "O campo nome é obrigatório")]
        public string Name { get; private set; }

        [Required(ErrorMessage = "O campo email é obrigatório")]
        [EmailAddress(ErrorMessage = "O campo email não é um email válido")]
        public string Email { get; private set; }
    }
}
