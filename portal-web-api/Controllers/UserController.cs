using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using portal_web_api.Data.Repositories;
using portal_web_api.DTOs;
using portal_web_api.Models;
using portal_web_api.Services;
using portal_web_api.Services.Repository;
using System.Text;
using System.Text.Encodings.Web;

namespace portal_web_api.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : Controller
    {
        private IUserRepository _userRepository;
        private IEmailSenderRepository _emailSender;

        public UserController(IUserRepository userRepository, IEmailSenderRepository emailSender)
        {
            _userRepository = userRepository;
            _emailSender = emailSender;
        }

        [HttpGet]
        [Route("get")]
        [Authorize(Roles = "collaborator")]
        public IActionResult GetAll()
        {
            var user = _userRepository.GetAll();
            return Ok(new 
            {
                success = true,
                data = user 
            });
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "collaborator")]
        public IActionResult FindById(string id)
        {
            var user = _userRepository.FindById(id);

            if (user == null)
            {
                string[] error = { "Não existe usuários com esse id" };
                return NotFound(new
                {
                    success = true,
                    errors = new { Id = error }
                });
            }

            return Ok(new 
            {
                success = true,
                data = user 
            });
        }

        [HttpPost]
        [Route("signup")]
        [AllowAnonymous]
        public IActionResult Create(UserCreateRequest newUser)
        {
            User createUser = (User)newUser;
            if (_userRepository.Create(createUser) == null)
            {
                string[] error = { "Já existe um usuário com esse nome" };
                return BadRequest(new 
                { 
                    success = false,
                    errors = new { Name = error } 
                });
            }
            createUser.Password = "";
            return Created("", new 
            { 
                success = true,
                data = createUser 
            });
        }

        [HttpPost]
        [Route("signin")]
        [AllowAnonymous]
        public IActionResult Login(UserLoginRequest user)
        {
            var findUser = _userRepository.FindByNameAndPassword(user.Name, user.Password);
            UserLoginResponse loginResponse = new UserLoginResponse(false);
            if (findUser == null)
            {
                string[] error = { "Não existe um usuário com essa senha registrado" };
                return NotFound(new 
                { 
                    success=loginResponse.Success,
                    errors = new { NotFound = error }
                });
            }

            var token = TokenService.GenerateToken(findUser);
            findUser.Password = "";
            loginResponse.Success = true;
            loginResponse.Token = new { 
                access_token = token, 
                expired_in = Settings.getTimeExpiredToken() 
            };
            loginResponse.Data = findUser;
            return Ok(loginResponse);
        }

        [HttpPost]
        [Route("forget-password")]
        [AllowAnonymous]
        public async Task<IActionResult> ForgetPassword(UserForgetPasswordRequest userRequest)
        {
            User user = _userRepository.FindByNameAndEmail(userRequest.Name, userRequest.Email);
            if (user == null)
            {
                string[] error = { "Não existe um usuário com esse nome e esse email registrado" };
                return NotFound(new
                {
                    success = false,
                    errors = new { NotFound = error }
                });
            }
            user.Type = "forget-password";
            var token = TokenService.GenerateToken(user);
            string urlResetPassword = Settings.UrlFront+ "recoverPassword/" + token;
            StringBuilder message = new StringBuilder();
            message.Append("<h1>Most Quotation :: Recuperação de Senha</h1>");
            message.Append($"<p>Por favor, redefina sua senha <a href='{HtmlEncoder.Default.Encode(urlResetPassword)}'>Clicando aqui</a>.</p>");
            message.Append($"<p>Lembrando que a redefinição de senha tem o limite de até {DateTime.Now.AddHours(Settings.TimeToExpiredToken)}.</p>");
            message.Append("<p>Atenciosamente<br>Equipe de Suporte Most Quotation</p>");
            await _emailSender.SendEmailAsync(user.Email, "Recuperação de Senha", "", message.ToString());

            return Ok(new
            {
                success = true
            });
        }


        [HttpPost]
        [Route("recover-password")]
        [Authorize(Roles = "forget-password")]
        public IActionResult ForgetPassword(UserForgotPasswordRequest request)
        {
            string name = HttpContext.User.Claims.First().Value;
            User user = _userRepository.FindByName(name);
            if (user == null)
            {
                string[] error = { "Não existe um usuário com esse nome registrado" };
                return NotFound(new
                {
                    success = false,
                    errors = new { NotFound = error }
                });
            }
            user.Password = request.Password;
            _userRepository.Update(user);
            return Ok(new { success = true });
        }
    }
}
