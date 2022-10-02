using MostQuotation.Data.Repositories;
using MostQuotation.Models;

namespace MostQuotation.Services
{
    public class BackgroundDollarQuotation : BackgroundService
    {
        private IQuotationRepository _quotationRepository;

        public BackgroundDollarQuotation(IQuotationRepository quotationRepository)
        {
            _quotationRepository = quotationRepository;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                DollarQuotation quotationNow = new DollarQuotation(DateTime.UtcNow.Add(new TimeSpan(-3, 0, 0)), 2.52);
                _quotationRepository.Create(quotationNow);

                await Task.Delay(60000, stoppingToken);//60 segundo
            }
        }
    }
}
