using System.ComponentModel.DataAnnotations;

namespace portal_web_api.DTOs
{
    public class DocumentExtractionRequest
    {
        public DocumentExtractionRequest(string document) {
            Document = document;
        }

        [Required(ErrorMessage = "O campo documento é obrigatório")]
        public string Document { get; set; }
    }
}
