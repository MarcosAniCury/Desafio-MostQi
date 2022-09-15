using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using portal_web_api.Data.Repositories;
using portal_web_api.DTOs;
using portal_web_api.Models;

namespace portal_web_api.Controllers
{
    [Route("api/client")]
    [ApiController]
    public class ClientController : Controller
    {
        private IUserRepository _userRepository;

        public ClientController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPost]
        [Route("create")]
        [Authorize(Roles = "collaborator")]
        public IActionResult CreateClient(ClientCreateRequest request)
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

        [HttpGet("{id}")]
        [Authorize(Roles = "collaborator")]
        public IActionResult FindById(string id)
        {
            var client = _userRepository.FindById(id);

            if (client == null)
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
                data = client
            });
        }
    }
}
