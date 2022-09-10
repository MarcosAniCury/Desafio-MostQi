using Microsoft.AspNetCore.Mvc;
using portal_web_api.Data.Repositories;
using portal_web_api.Models;

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

        // GET: api/user/getAll
        [HttpGet]
        [Route("getAll")]
        public IActionResult Get()
        {
            var tarefas = _userRepository.GetAll();
            return Ok(tarefas);
        }

        // GET api/user/{id}
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var tarefa = _userRepository.FindById(id);

            if (tarefa == null)
                return NotFound();

            return Ok(tarefa);
        }

        //POST api/user/create
        [HttpPost]
        [Route("create")]
        public IActionResult Post(UserRequest newUser)
        {
            User createUser = (User)newUser;
            _userRepository.Create(createUser);
            return Created("", newUser);
        }
    }
}
