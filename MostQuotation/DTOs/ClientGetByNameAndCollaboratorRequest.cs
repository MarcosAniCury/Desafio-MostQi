using System.ComponentModel.DataAnnotations;

namespace MostQuotation.DTOs
{
    public class ClientGetByNameAndCollaboratorRequest
    {
        public ClientGetByNameAndCollaboratorRequest(string name, string collaborator, int pageIndex)
        {
            Name = name;
            Collaborator = collaborator;
            PageIndex = pageIndex;
        }

        public string? Name { get; private set; }

        public String? Collaborator { get; private set; }

        [Range(1, int.MaxValue, ErrorMessage = "O campo página deve ter o valor minimo de 1")]
        [Required(ErrorMessage = "O campo página é obrigatório")]
        public int PageIndex { get; set; }
    }
}
