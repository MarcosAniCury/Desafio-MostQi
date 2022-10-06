using System.ComponentModel.DataAnnotations;

namespace MostQuotation.DTOs
{
    public class QuotationGetWithFilterRequest
    {
        public QuotationGetWithFilterRequest(DateTime initialDate, DateTime finalDate)
        {
            InitialDate = initialDate;
            FinalDate = finalDate;
        }

        [Required(ErrorMessage = "O campo data inicial é obrigatório")]
        public DateTime InitialDate { get; set; }

        [Required(ErrorMessage = "O campo data final é obrigatório")]
        public DateTime FinalDate { get; set; }
    }
}
