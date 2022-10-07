using MostQuotation.Data.Repositories;
using MostQuotation.Models;
using System.Globalization;
using System.Net.Http.Headers;
using System.Text.Json;

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
                DollarQuotation quotationNow = await getUSDBRLQuotation();
                _quotationRepository.Create(quotationNow);

                await Task.Delay(60000, stoppingToken);//60 segundos
            }
        }

        private async Task<DollarQuotation> getUSDBRLQuotation()
        {
            var client = new HttpClient();
            string json = JsonSerializer.Serialize(new {});
            StringContent httpContent = new StringContent(json, System.Text.Encoding.UTF8, "application/json");
            var response = await client.PostAsync(Settings.UrlCurrencyScoop+Settings.API_KEY_CURRENCYSCOOP, httpContent);
            JsonElement currencyUSD = JsonSerializer.Deserialize<dynamic>(response.Content.ReadAsStream());

            float currencyUSDInBRL = float.Parse(currencyUSD.GetProperty("response").GetProperty("rates").GetProperty("BRL").ToString(), CultureInfo.InvariantCulture.NumberFormat);
            return new DollarQuotation(DateTime.UtcNow.Add(new TimeSpan(-3, 0, 0)), currencyUSDInBRL);
        }
    }
}
