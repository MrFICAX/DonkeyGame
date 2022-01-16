using DonkeyGameAPI.Hubs;
using DonkeyGameAPI.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace DonkeyGameAPI.Controllers
{
    [Route("Game")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly IGameService gameService;
        private readonly IHubContext<GameHub> hubContext;
        public GameController(IGameService gameService, IHubContext<GameHub> hubContext)
        {
            this.gameService = gameService;
            this.hubContext = hubContext;
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

            await hubContext.Clients.Group("gameID:" + gameID).SendAsync("newJoin", Game);
            return Ok(Game);

        }

        [Route("RemovePlayer/{gameID}/{userID}")]
        [HttpPut]
        public async Task<ActionResult> RemovePlayer(int gameID, int userID)
        {
            var Game = await gameService.RemovePlayer(gameID, userID);

            if (Game == null)
                return BadRequest("Didn't remove"); //ERROR

            await hubContext.Clients.Group("gameID:" + gameID).SendAsync("newJoin", Game);
            return Ok(Game);
        }

        [Route("RemoveGame/{gameID}")]
        [HttpDelete]
        public async Task<ActionResult> RemoveGame(int gameID)
        {
            var success = await gameService.RemoveGame(gameID);

            if (!success)
                return BadRequest("Didn't remove"); //ERROR

            return Ok();
        }

        [Route("StartGame/{gameID}")]
        [HttpGet]
        public async Task<ActionResult> StartGame(int gameID)
        {
            var game = await gameService.StartGame(gameID);
            if (game == null)
                return BadRequest("Didn't start");
            return Ok(game);
        }

    }
}
