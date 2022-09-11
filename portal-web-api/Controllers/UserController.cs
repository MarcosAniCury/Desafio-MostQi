using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using portal_web_api.Data.Repositories;
using portal_web_api.DTOs;
using portal_web_api.Models;
using portal_web_api.Services;

namespace portal_web_api.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : Controller
    {
        private IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
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
    }
}
