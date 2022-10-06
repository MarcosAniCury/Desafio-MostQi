using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MostQuotation.Data.Repositories;
using MostQuotation.DTOs;
using MostQuotation.Models;

namespace MostQuotation.Controllers
{
    [Route("api/quotation")]
    [ApiController]
    public class QuotationController : Controller
    {
        private IQuotationRepository _quotationRepository;

        public QuotationController(IQuotationRepository quotationRepository)
        {
            _quotationRepository = quotationRepository;
        }

        [HttpPost]
        [Route("get-with-filter")]
        [Authorize(Roles = "client")]
        public IActionResult GetQuotationWithFilter(QuotationGetWithFilterRequest request)
        {
            List<DollarQuotation> quotation = _quotationRepository.FindByDate(request.InitialDate, request.FinalDate.AddHours(23).AddMinutes(59).AddSeconds(59));
            if (quotation == null || quotation.Count == 0)
            {
                string[] error = { "Não possui nenhuma cotacao registrada nesse dia" };
                return BadRequest(new
                {
                    success = false,
                    errors = error
                });
            }
            float average = quotation.Sum(x => x.Quotation) / quotation.Count;
            float max = quotation.Max(x => x.Quotation);
            float min = quotation.Min(x => x.Quotation);
            return Ok(new
            {
                success = true,
                data = new
                {
                    quotation = quotation,
                    average = average,
                    max = max,
                    min = min
                }
            });
        }
    }
}
