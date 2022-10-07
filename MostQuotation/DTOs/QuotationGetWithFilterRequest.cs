using System.ComponentModel.DataAnnotations;

namespace MostQuotation.DTOs
{
    public class QuotationGetWithFilterRequest
    {
        public QuotationGetWithFilterRequest(DateTime initialDate, DateTime finalDate, int pageIndex)
        {
            InitialDate = initialDate;
            FinalDate = finalDate;
            PageIndex = pageIndex;
        }

        [Required(ErrorMessage = "O campo data inicial é obrigatório")]
        public DateTime InitialDate { get; set; }

        [Required(ErrorMessage = "O campo data final é obrigatório")]
        public DateTime FinalDate { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "O campo página deve ter o valor minimo de 1")]
        [Required(ErrorMessage = "O campo página é obrigatório")]
        public int PageIndex { get; set; }
    }
}
