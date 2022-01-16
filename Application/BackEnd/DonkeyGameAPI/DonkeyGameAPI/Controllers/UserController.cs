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
        public async Task<ActionResult> LogIn([FromBody] User user)
        {
            var resultUser =  await this.userService.LogIn(user);

            if (resultUser == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(resultUser);

            //User tmp = user;
            //var result = this.userService.LogIn(tmp);
            //return Ok(result);
        }         
    }
}
