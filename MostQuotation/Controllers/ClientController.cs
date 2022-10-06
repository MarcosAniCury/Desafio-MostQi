using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MostQuotation.Data.Repositories;
using MostQuotation.DTOs;
using MostQuotation.Models;
using MostQuotation.Services;
using System.Text.Encodings.Web;
using System.Text;
using MostQuotation.Services.Repository;

namespace MostQuotation.Controllers
{
    [Route("api/client")]
    [ApiController]
    public class ClientController : Controller
    {
        /*
         Constants
         */
        private const int NUMBER_OF_ITEMS_IN_PAGE = 4;

        private IUserRepository _userRepository;
        private IEmailSenderRepository _emailSender;

        public ClientController(IUserRepository userRepository, IEmailSenderRepository emailSender)
        {
            _userRepository = userRepository;
            _emailSender = emailSender;
        }

        [HttpPost]
        [Route("create")]
        [Authorize(Roles = "collaborator")]
        public async Task<IActionResult> CreateClient(ClientCreateRequest request)
        {
            User createUser = (User)request;
            if (_userRepository.Create(createUser) == null)
            {
                string[] error = { "Já existe um usuário com esse nome" };
                return BadRequest(new
                {
                    success = false,
                    errors = new { Name = error }
                });
            }
            createUser.Type = "forget-password";
            var token = TokenService.GenerateToken(createUser);
            string urlResetPassword = Settings.UrlFront + "recoverPassword/" + token;
            StringBuilder message = new StringBuilder();
            message.Append("<h1>Most Quotation :: Definição de Senha</h1>");
            message.Append($"<p>Por favor, defina sua senha <a href='{HtmlEncoder.Default.Encode(urlResetPassword)}'>Clicando aqui</a>.</p>");
            message.Append($"<p>Lembrando que a definição de senha tem o limite de até {DateTime.Now.AddHours(Settings.TimeToExpiredToken)}.</p>");
            message.Append("<p>Atenciosamente<br>Equipe de Suporte Most Quotation</p>");
            await _emailSender.SendEmailAsync(createUser.Email, "Definição de Senha", "", message.ToString());
            createUser.Password = "";
            return Created("", new
            {
                success = true,
                data = createUser
            });
        }

        [HttpPost]
        [Route("get-by-name")]
        [Authorize(Roles = "collaborator")]
        public IActionResult GetByNameLike(ClientGetByNameRequest request)
        {
            var clients = _userRepository.FindByNameLike(request.Research);
            if (clients == null)
            {
                string[] error = { "Nenhum usuário foi encontrado" };
                return BadRequest(new
                {
                    success = false,
                    errors = new { Reseach = error }
                });
            }

            int itemsSkip = (request.PageIndex - 1) * NUMBER_OF_ITEMS_IN_PAGE;
            if (itemsSkip >= clients.Count) 
            {
                string[] error = { "Não possui usuários nessa página" };
                return BadRequest(new
                {
                    success = false,
                    errors = new { PageNotFound = error }
                });
            }

            var SelectedClients = clients.Skip(itemsSkip).Take(NUMBER_OF_ITEMS_IN_PAGE).OrderByDescending(x => x.CreatedAt).ToArray();

            foreach(var client in SelectedClients)
            {
                client.Password = "";
            }

            return Ok(new
            {
                success = true,
                data = SelectedClients
            });
        }

        [HttpPost]
        [Route("get-by-name-and-collaborator")]
        [Authorize(Roles = "collaborator")]
        public IActionResult GetByNameLikeAndCollaboratorLike(ClientGetByNameAndCollaboratorRequest request)
        {
            var clients = _userRepository.FindByNameLikeAndCollaboratorLike(request.Name, request.Collaborator);
            if (clients == null)
            {
                string[] error = { "Nenhum usuário foi encontrado" };
                return BadRequest(new
                {
                    success = false,
                    errors = new { Reseach = error }
                });
            }

            int itemsSkip = (request.PageIndex - 1) * NUMBER_OF_ITEMS_IN_PAGE;
            if (itemsSkip >= clients.Count)
            {
                string[] error = { "Não possui usuários nessa página" };
                return BadRequest(new
                {
                    success = false,
                    errors = new { PageNotFound = error }
                });
            }

            var SelectedClients = clients.OrderByDescending(x => x.CreatedAt).Skip(itemsSkip).Take(NUMBER_OF_ITEMS_IN_PAGE).ToArray();

            foreach (var client in SelectedClients)
            {
                client.Password = "";
            }

            return Ok(new
            {
                success = true,
                data = SelectedClients
            });
        }
    }
}
