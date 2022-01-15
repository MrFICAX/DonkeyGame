using DataAccess.Models;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DonkeyGameBackEnd.Controllers
{
    [Route("Card")]
    [ApiController]
    public class CardController : ControllerBase
    {
        private ICardService cardService { get; set; }

        public CardController(ICardService cardService)
        {
            this.cardService = cardService;
        }

        // GET api/<UserController>/5
        [HttpGet("getCards")]
        public async Task<ActionResult> Get()
        {
            var result = await this.cardService.getCards();
            return Ok(result);
        }

        //[Route("CreateUser")]
        //[HttpPost]
        //public async Task<ActionResult> CreateUser([FromBody] User user)
        //{
        //    User tmp = user;
        //    var result = await this.userService.CreateUser(tmp);
        //    return Ok(result);
        //}

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
