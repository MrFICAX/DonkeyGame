using Microsoft.AspNetCore.Mvc;
using DonkeyGameAPI.Models;
using DonkeyGameAPI.IServices;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DonkeyGameAPI.Controllers
{
    [Route("User")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService userService { get; set; }

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }


        // GET: api/<UserController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        [Route("SignUp")]
        [HttpPost]
        public async Task<ActionResult> SignUpUser([FromBody] User user)
        {
            User tmp = user;
            var result = await this.userService.CreateUser(tmp);
            if (result == null)
                return StatusCode(405);
            return Ok(result);
        }

        [Route("LogIn")]
        [HttpPost]
        public async Task<ActionResult> LogInUser([FromBody] User user)
        {
            var resultUser = userService.LogIn(user);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(user);

            //User tmp = user;
            //var result = this.userService.LogIn(tmp);
            //return Ok(result);
        }

        // POST api/<UserController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
