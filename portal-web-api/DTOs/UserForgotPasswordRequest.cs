using System.ComponentModel.DataAnnotations;

namespace portal_web_api.DTOs
{
    public class UserForgotPasswordRequest
    {
        public UserForgotPasswordRequest(string password, string passwordConfirm)
        {
            Password = password;
            PasswordConfirm = passwordConfirm;
        }

        [Required(ErrorMessage = "O campo senha é obrigatório")]
        [StringLength(50, ErrorMessage = "O campo senha deve ter entre {2} e {1} caracteres", MinimumLength = 6)]
        public string Password { get; private set; }

        [Required(ErrorMessage = "O campo confirmacao de senha é obrigatório")]
        [StringLength(50, ErrorMessage = "O campo confirmacao de senha deve ter entre {2} e {1} caracteres", MinimumLength = 6)]
        [Compare(nameof(Password), ErrorMessage = "A senha e a confirmação de senha devem ser iguais")]
        public string PasswordConfirm { get; private set; }
    }
}
