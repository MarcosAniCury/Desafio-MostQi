using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using portal_web_api.Data.Repositories;
using portal_web_api.DTOs;
using portal_web_api.Models;
using portal_web_api.Services;
using System.Text.Encodings.Web;
using System.Text;
using portal_web_api.Services.Repository;

namespace portal_web_api.Controllers
{
    [Route("api/client")]
    [ApiController]
    public class ClientController : Controller
    {
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

        [HttpGet]
        [Route("get")]
        [Authorize(Roles = "collaborator")]
        public IActionResult GetAll()
        {
            var client = _userRepository.GetAllClients();
            return Ok(new
            {
                success = true,
                data = client
            });
        }

        [HttpPost]
        [Route("get-by-name")]
        [Authorize(Roles = "collaborator")]
        public IActionResult GetByNameLike(ClientGetByNameRequest request)
        {
            //var client = _userRepository.GetAllClients();
            return Ok(new
            {
                success = true,
                //data = client
            });
        }
    }
}
