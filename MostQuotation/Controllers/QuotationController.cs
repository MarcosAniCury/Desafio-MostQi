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
        /*
         Constants
         */
        private const int NUMBER_OF_ITEMS_IN_PAGE = 6;

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

            int itemsSkip = (request.PageIndex - 1) * NUMBER_OF_ITEMS_IN_PAGE;
            if (itemsSkip >= quotation.Count)
            {
                string[] error = { "Não possui usuários nessa página" };
                return BadRequest(new
                {
                    success = false,
                    errors = error
                });
            }

            var SelectedQuotations = quotation.OrderByDescending(x => x.DateTime).Skip(itemsSkip).Take(NUMBER_OF_ITEMS_IN_PAGE).ToArray();

            return Ok(new
            {
                success = true,
                data = new
                {
                    quotation = quotation,
                    average = average,
                    max = max,
                    min = min,
                    quotations_items = SelectedQuotations
                }
            });
        }
    }
}
