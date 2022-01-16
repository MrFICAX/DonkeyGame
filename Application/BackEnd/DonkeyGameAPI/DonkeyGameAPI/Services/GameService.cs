using DonkeyGameAPI.IServices;
using DonkeyGameAPI.Models;
using DonkeyGameAPI.UOfW;
using Microsoft.EntityFrameworkCore;
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
            game.Players.Add(PlayerState.FromUser(author));           
                
            this.unitOfWork.GameRepository.Add(game);
            await this.unitOfWork.CompleteAsync(); 
            return game;
        }

        public async Task<Game> JoinGame(int gameID, int userID)
        {
            var game = unitOfWork.GameRepository.GetIncludes(g => g.Players).FirstOrDefault(g => g.Id == gameID);
            
            User whoWantsToJoin = await this.unitOfWork.UserRepository.GetOne(userID);           
            
            if (game.Players.Count > 4) return null; 

            game.Players.Add(PlayerState.FromUser(whoWantsToJoin));
            this.unitOfWork.GameRepository.Update(game);
            await this.unitOfWork.CompleteAsync();
            return game;                                 
        }

        public async Task<Game> RemovePlayer(int gameID, int userID)
        {
            var game = unitOfWork.GameRepository.GetIncludes(g => g.Players).FirstOrDefault(g => g.Id == gameID);

            if (game != null)
            {
                var player = game.Players.Find(p => p.UserID == userID);
                if(player != null) unitOfWork.PlayerStateRepository.Delete(player);                
                if(player!=null) game.Players.Remove(player);
                unitOfWork.GameRepository.Update(game);
                await unitOfWork.CompleteAsync();
            }            
            return game;
        }

        public async Task<bool> RemoveGame(int gameID)
        {
            var game = unitOfWork.GameRepository.GetIncludes(g => g.Players).FirstOrDefault(g => g.Id == gameID);
            if (game != null)
            {
                foreach (var player in game.Players)
                {
                    unitOfWork.PlayerStateRepository.Delete(player);
                    await unitOfWork.CompleteAsync();
                }
                unitOfWork.GameRepository.Delete(game);
                await unitOfWork.CompleteAsync();
                return true;
            }
            return false;
        }
    }
}
