using MostQuotation.Models;

namespace MostQuotation.Data.Repositories
{
    public interface IQuotationRepository
    {
        DollarQuotation FindByDateAndQuotation(DateTime date, double valueQuotation);
        List<DollarQuotation> FindByDate(DateTime firstDate, DateTime secondDate);
        DollarQuotation Create(DollarQuotation quotation);
    }
}
