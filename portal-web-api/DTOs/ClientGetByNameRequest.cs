using System.ComponentModel.DataAnnotations;

namespace portal_web_api.DTOs
{
    public class ClientGetByNameRequest
    {
        public ClientGetByNameRequest(string name)
        {
            Name = name;
        }

        [Required(ErrorMessage = "O campo nome é obrigatório")]
        public string Name { get; private set; }
    }
}
