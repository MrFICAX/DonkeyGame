using DonkeyGameAPI.DTOs;
using DonkeyGameAPI.Hubs;
using DonkeyGameAPI.IServices;
using DonkeyGameAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalRChat.Hubs;
using System.Collections.Generic;

namespace DonkeyGameAPI.Controllers
{
    [Route("Game")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly IGameService gameService;
        private readonly IHubContext<GameNChatHub> _chatHub;
        private readonly IHubContext<GameHub> _gameHub;


        //private readonly IHubContext<GameHub> hubContext;
        private GameHubService _gameHubService;

        public GameHubService GameHub
        {
            get
            {
                return this._gameHubService;
            }

            set { this._gameHubService = value; }
        }

        public GameController(IGameService gameService, IHubContext<GameHub> hubContext, IHubContext<GameHub> gameHub, IHubContext<GameNChatHub> chatHub)
        {
            this.gameService = gameService;
            //_gameHubService = new GameHubService(hubContext);
            _gameHub = gameHub;
            _chatHub = chatHub;


            //this.hubContext = hubContext;
        }

        [Route("GetAllGamesNotStarted")]
        [HttpGet]
        public IActionResult GetAllGamesNotStarted()
        {
            var Games = gameService.GetAllGamesNotStarted();

            if (Games == null)
                return BadRequest("No Games Created"); //ERROR
                                                       //return StatusCode(494);

            return Ok(Games);
        }

        [Route("GetAllGamesNotStartedOrWithMe/{userID}")]
        [HttpGet]
        public IActionResult GetAllGamesNotStartedOrWithMe(int userID)
        {
            var Games = gameService.GetAllGamesNotStartedOrWithMe(userID);

            if (Games == null)
                return BadRequest("No Games Created"); //ERROR
                                                       //return StatusCode(494);

            return Ok(Games);
        }

        [Route("CreateGame/{userID}/{gameCode}")]
        [HttpPost]
        public async Task<ActionResult> CreateGame(int userID, string gameCode)
        {

            var Game = await gameService.CreateGame(userID, gameCode);

            if (Game == null)
                return BadRequest("Game not created"); //ERROR

            await _chatHub.Clients.All.SendAsync("newGame", Game);
            await _gameHub.Clients.All.SendAsync("gameHubnewGame", Game);
            return Ok(Game);
        }

        [Route("JoinGame/{gameID}/{userID}")]
        [HttpPost]
        public async Task<ActionResult> JoinGame(int gameID, int userID)
        {
            var Game = await gameService.JoinGame(gameID, userID);

            if (Game == null)
                return StatusCode(405); //ERROR

            //await hubContext.Clients.Group("gameID:" + gameID).SendAsync("newJoin", Game);

            //await GameHub.NotifyOnGameChanges(gameID, "newJoin", Game);

            //GameHub.sendGame(Game);

            await _chatHub.Clients.All.SendAsync("updateGame", Game);

            return Ok(Game);

        }

        [Route("RemovePlayer/{gameID}/{userID}")]
        [HttpPut]
        public async Task<ActionResult> RemovePlayer(int gameID, int userID)
        {
            var Game = await gameService.RemovePlayer(gameID, userID);

            if (Game == null)
                return BadRequest("Didn't remove"); //ERROR

            //await hubContext.Clients.Group("gameID:" + gameID).SendAsync("newJoin", Game);

            //await GameHub.NotifyOnGameChanges(gameID, "newJoin", Game);

            await _chatHub.Clients.All.SendAsync("updateGame", Game);

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
                return StatusCode(405);

            //game.Players.ForEach(playerState =>
            //{
            //    MyCards myCards = new MyCards();
            //    myCards.PlayerStateID = playerState.PlayerStateID;
            //    myCards.gameCode = game.GameCode;
            //    myCards.myCards = playerState.Cards;
            //    _chatHub.Clients.Group(playerState.User.UserID.ToString()).SendAsync("myCards", myCards);

            //});

            game.Players.ForEach(playerState => playerState.Cards = new List<Card>());

            await _chatHub.Clients.All.SendAsync("gameStarted", game);
            return Ok(game);
        }

        [Route("GivePointAndRefreshGame/{gameID}/{userLoserID}")]
        [HttpGet]
        public async Task<ActionResult> GivePointAndRefreshGame(int gameID, int userLoserID)
        {
            var game = await gameService.GivePointsAndRefreshGame(gameID, userLoserID);
            if (game == null)
                return StatusCode(405);

            game.Players.ForEach(playerState => playerState.Cards = new List<Card>());

            if (game.LoserPlayer != null)
            {
                await _chatHub.Clients.Group(game.GameCode).SendAsync("gameFinished", game);
            }
            else
            {
                await _chatHub.Clients.Group(game.GameCode).SendAsync("gameStarted", game);
            }
            //game.Players.ForEach(playerState =>
            //{
            //    MyCards myCards = new MyCards();
            //    myCards.PlayerStateID = playerState.PlayerStateID;
            //    myCards.gameCode = game.GameCode;
            //    myCards.myCards = playerState.Cards;
            //    _chatHub.Clients.Group(playerState.User.UserID.ToString()).SendAsync("myCards", myCards);

            //});


            return Ok(game);
        }



        [Route("GetMyCards/{gameID}/{userID}")]
        [HttpGet]
        public async Task<ActionResult> GetMyCards(int gameID, int userID)
        {
            var myCards = await gameService.GetMyCards(gameID, userID);

            if (myCards == null)
                return StatusCode(405);

            await _chatHub.Clients.Group(myCards.PlayerStateID.ToString()).SendAsync("myCards", myCards);
            return Ok(myCards);
            //return Ok(game);

            return null;
        }

        [Route("PassACard/{gameID}/{playerfromID}/{cardID}")]
        [HttpGet]
        public async Task<ActionResult> PassACard(int gameID, int playerfromID, int cardID)
        {
            var game = await gameService.PassACard(gameID, playerfromID, cardID);
            if (game == null)
                return BadRequest("Didn't pass a card");

            var playerStateFromIdx = game.Players.FindIndex(p => p.User.UserID == playerfromID);

            var playerStateTo = game.Players[(playerStateFromIdx + 1) % game.Players.Count];


            var myCards = await gameService.GetMyCards(gameID, playerfromID);
            var playerToCards = await gameService.GetMyCards(gameID, playerStateTo.User.UserID);


            await _chatHub.Clients.Group(game.Players[playerStateFromIdx].PlayerStateID.ToString()).SendAsync("myCards", myCards);
            await _chatHub.Clients.Group(playerStateTo.PlayerStateID.ToString()).SendAsync("myCards", playerToCards);

            game.Players.ForEach(playerState => playerState.Cards = new List<Card>());
            await _chatHub.Clients.Group(game.GameCode).SendAsync("updateGame", game);


            return Ok(game);
        }

        [Route("SetLoserPlayer/{gameID}/{userID}")]
        [HttpGet]
        public async Task<ActionResult> SetLoserPlayer(int gameID, int userID)
        {
            var game = await gameService.SetLoserPlayer(gameID, userID);
            if (game == null)
                return BadRequest("Didn't pass a card");

            return Ok(game);
        }

    }
}
