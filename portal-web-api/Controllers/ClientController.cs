using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using portal_web_api.Data.Repositories;
using portal_web_api.DTOs;

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
            
            return Ok(new { success = true });
        }
    }
}
