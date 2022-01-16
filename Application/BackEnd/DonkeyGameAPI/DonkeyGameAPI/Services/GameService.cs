using DonkeyGameAPI.IServices;
using DonkeyGameAPI.Models;
using DonkeyGameAPI.UOfW;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DonkeyGameAPI.Services
{
    public class GameService : IGameService
    {
        private IUnitOfWork unitOfWork;
        public GameService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<Game>> GetAllGamesNotStarted()
        {
            IEnumerable<Game> games = await this.unitOfWork.GameRepository.GetAll();
            return games;
        }

        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[Random.Shared.Next(s.Length)]).ToArray());
        }

        public async Task<Game> CreateGame(int userID)
        {
            User author = await this.unitOfWork.UserRepository.GetOne(userID);

            Game game = new Game();

            game.GameOwnerID = author.UserID;
            game.GameCode = RandomString(15);
            game.IsFinished = false;
            game.Players = new List<PlayerState>();

            PlayerState playerState = PlayerState.FromUser(author);
            game.Players.Add(playerState);
                       
            this.unitOfWork.PlayerStateRepository.Add(playerState);
            this.unitOfWork.GameRepository.Add(game);

            return game;
        }

        public async Task<Game> JoinGame(int gameID, int userID)
        {
            Game game = await this.unitOfWork.GameRepository.GetOne(gameID);
            User whoWantsToJoin = await this.unitOfWork.UserRepository.GetOne(userID);

            if (game.Players.Count > 4) game.Players.Add(PlayerState.FromUser(whoWantsToJoin));
            else game = null;
            return game;
        }
    }
}
