using System.ComponentModel.DataAnnotations;

namespace portal_web_api.DTOs
{
    public class ClientGetAll
    {
        public ClientGetAll(int pageIndex)
        {
            PageIndex = pageIndex;
        }

        [Range(1, int.MaxValue, ErrorMessage = "O campo página deve ter o valor minimo de 1")]
        [Required(ErrorMessage = "O campo página é obrigatório")]
        public int PageIndex { get; set; }
    }
}
