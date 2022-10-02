namespace MostQuotation.Models
{
    public class DollarQuotation
    {
        public DollarQuotation(DateTime dateTime, float quotation)
        {
            Id = Guid.NewGuid().ToString();
            DateTime = dateTime;
            Quotation = quotation;
        }

        public string Id { get; set; }
        public DateTime DateTime { get; set; }
        public float Quotation { get; set; } 
    }
}
