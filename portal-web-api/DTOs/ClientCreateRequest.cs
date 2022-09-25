using System.ComponentModel.DataAnnotations;

namespace portal_web_api.DTOs
{
    public class ClientCreateRequest
    {
        public ClientCreateRequest(string name, string password, string email, string rg, string dateOfBirth, string documentFront, string documentBack, string selfie, string collaborator)
        {
            Name = name;
            Email = email;
            Password = password;
            RG = rg;
            DateOfBirth = dateOfBirth;
            DocumentFront = documentFront;
            DocumentBack = documentBack;
            Selfie = selfie;
            Collaborator = collaborator;
        }

        [Required(ErrorMessage = "O campo nome é obrigatório")]
        public string Name { get; set; }

        [Required(ErrorMessage = "O campo email é obrigatório")]
        [EmailAddress(ErrorMessage = "O campo email não é um email válido")]
        public string Email { get; private set; }

        [Required(ErrorMessage = "O campo senha é obrigatório")]
        [StringLength(50, ErrorMessage = "O campo senha deve ter entre {2} e {1} caracteres", MinimumLength = 6)]
        public string Password { get; private set; }

        [Required(ErrorMessage = "O campo RG é obrigatório")]
        [StringLength(9, ErrorMessage = "O campo RG deve ter entre {1} caracteres")]
        public string RG { get; set; }

        [Required(ErrorMessage = "O campo data de nascimento é obrigatório")]
        public string DateOfBirth { get; set; }

        [Required(ErrorMessage = "O campo frente do documento é obrigatório")]
        public string DocumentFront { get; set; }

        [Required(ErrorMessage = "O campo verso do documento é obrigatório")]
        public string DocumentBack { get; set; }

        [Required(ErrorMessage = "O campo selfie é obrigatório")]
        public string Selfie { get; set; }

        [Required(ErrorMessage = "O campo colaborador é obrigatório")]
        public string Collaborator { get; set; }

    }
}
