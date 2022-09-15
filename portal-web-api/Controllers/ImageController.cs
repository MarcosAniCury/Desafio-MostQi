using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using portal_web_api.DTOs;
using System.Net.Http.Headers;
using System.Text.Json;

namespace portal_web_api.Controllers
{
    [Route("api/image")]
    [ApiController]
    public class ImageController : Controller
    {
        private async Task<JsonElement> RunPostRoutes(dynamic request, string url, string bearerToken = null)
        {
            var client = new HttpClient();

            if (bearerToken != null)
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", bearerToken);
            }

            string json = JsonSerializer.Serialize(request);

            StringContent httpContent = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

            var response = await client.PostAsync(url, httpContent);

            return JsonSerializer.Deserialize<dynamic>(response.Content.ReadAsStream());
        }

        [HttpPost]
        [Route("document-extraction")]
        [Authorize(Roles = "collaborator")]
        public async Task<IActionResult> DocumentExtraction(DocumentExtractionRequest request)
        {
            try 
            {
                dynamic requestAuthentication = new
                {
                    token = Settings.TokenMostQIAuthenticate
                };
                JsonElement authenticateMostQI = await RunPostRoutes(requestAuthentication, Settings.UrlMostQIAuthenticate);

                dynamic requestContentExtraction = new
                {
                    fileBase64 = request.Document
                };
                string teste = authenticateMostQI.GetProperty("token").ToString();
                JsonElement contentExtraction = await RunPostRoutes(
                    requestContentExtraction, 
                    Settings.UrlMostQIDocumentExtraction, 
                    authenticateMostQI.GetProperty("token").ToString()
                );

                return Ok(new
                {
                    success = true,
                    data = contentExtraction
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    data = ex.Message
                });
            }
        }
    }
}
