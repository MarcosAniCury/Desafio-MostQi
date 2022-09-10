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
        [Route("getAll")]
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
                return NotFound(new
                {
                    success = true,
                    errors = new { Id = "Não existe usuários com esse id" }
                });

            return Ok(new 
            {
                success = true,
                data = user 
            });
        }

        [HttpPost]
        [Route("create")]
        [AllowAnonymous]
        public IActionResult Create(UserCreateRequest newUser)
        {
            User createUser = (User)newUser;
            if (_userRepository.Create(createUser) == null)
            {
                return BadRequest(new 
                { 
                    success = false,
                    erros = new { Name = "Já existe um usuário com esse nome" } 
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
        [Route("login")]
        [AllowAnonymous]
        public IActionResult Login(UserLoginRequest user)
        {
            var findUser = _userRepository.FindByNameAndPassword(user.Name, user.Password);
            UserLoginResponse loginResponse = new UserLoginResponse(false, Settings.getTimeExpiredToken());
            if (findUser == null)
            {
                return NotFound(loginResponse);
            }

            var token = TokenService.GenerateToken(findUser);
            findUser.Password = "";
            loginResponse.Token = token;
            loginResponse.data = findUser;
            return Ok(loginResponse);
        }
    }
}
