using DonkeyGameAPI.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DonkeyGameAPI.Controllers
{
    [Route("Game")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private IGameService gameService;

        public GameController(IGameService gameService)
        {
            this.gameService = gameService;
        }

        [Route("GetAllGamesNotStarted")]
        [HttpGet]
        public async Task<ActionResult> GetAllGamesNotStarted()
        {
            var Games = await gameService.GetAllGamesNotStarted();

            if (Games == null)
                return BadRequest("No Games Created"); //ERROR

            return Ok(Games);
        }

        [Route("CreateGame/{userID}")]
        [HttpGet]
        public async Task<ActionResult> CreateGame(int userID)
        {
            var Game = await gameService.CreateGame(userID);

            if (Game == null)
                return BadRequest("Game not created"); //ERROR

            return Ok(Game);
        }

        [Route("JoinGame/{gameID}/{userID}")]
        [HttpGet]
        public async Task<ActionResult> JoinGame(int gameID, int userID)
        {
            var Game = await gameService.JoinGame(gameID, userID);

            if (Game == null)
                return BadRequest("Cannot join game"); //ERROR

            return Ok(Game);

        }

    }
}
