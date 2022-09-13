using System.ComponentModel.DataAnnotations;

namespace portal_web_api.DTOs
{
    public class UserForgotPasswordRequest
    {
        public UserForgotPasswordRequest(string password)
        {
            Password = password;
        }

        [Required(ErrorMessage = "O campo senha é obrigatório")]
        [StringLength(50, ErrorMessage = "O campo senha deve ter entre {2} e {1} caracteres", MinimumLength = 6)]
        public string Password { get; private set; }
    }
}
