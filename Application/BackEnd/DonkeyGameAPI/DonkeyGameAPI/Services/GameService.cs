using DonkeyGameAPI.Hubs;
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
        private readonly IUnitOfWork unitOfWork;
        public GameService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public async Task<Game?> CreateGame(int userID, string gameCode)
        {

            User author = await this.unitOfWork.UserRepository.GetOne(userID);
            if (author == null) return null;

            Game gameByGameCode = this.unitOfWork.GameRepository.GetGameByGameCode(gameCode);
            if (gameByGameCode != null)
            {
                return null;
            }

            Game game = new Game();

            game.GameOwner = author;

            if (gameCode.CompareTo("default") == 0)
            {
                game.GameCode = RandomString(15);
            }
            else
            {
                game.GameCode = gameCode;
            }

            game.IsFinished = false;
            game.Players = new List<PlayerState>
            {
                PlayerState.FromUser(author)
            };

            await unitOfWork.GameRepository.Add(game);
            await this.unitOfWork.CompleteAsync();

            game.ClearPasswords();
            return game;
        }

        public async Task<Game?> StartGame(int gameID)
        {
            //            var game = unitOfWork.GameRepository.GetIncludes(g => g.Players).SingleOrDefault(g => g.GameID == gameID);
            var game = unitOfWork.GameRepository.GetGameWithPlayerStatesAndUserData(gameID);

            //OVO OBAVEZNO OTKOMENTARISATI 
            //if (game.Players.Count != 4)
            //{
            //    return null;
            //}

            if (game == null) return null;
            game.DateOfStart = DateTime.Now;
            int num = Random.Shared.Next(0, 3);
            List<Card> delt = new();
            List<Card> hand = new();
            Card card = new(0, "");

            Random rnd = new Random();
            int randomIndexForSpecialCard = rnd.Next() % 4;
            int randomIndexForFiveCards = rnd.Next() % 4;

            delt.Add(card);
            foreach (PlayerState playerState in game.Players)
            {
                int initialHandCount = 0;
                playerState.Cards = new List<Card>();

                if (game.Players.IndexOf(playerState) == randomIndexForSpecialCard)
                {
                    hand.Add(Card.SpecialCard());
                    playerState.HasSpecialCard = true;
                    initialHandCount = hand.Count;
                }
                for (int i = 0; i < 4 - initialHandCount; i++)
                {
                    do
                    {
                        card = Card.Deal().WithoutID();
                    } while (delt.Contains(card) && delt.Count < 17);
                    hand.Add(card);
                    delt.Add(card);

                }

                if (game.Players.IndexOf(playerState) == randomIndexForFiveCards)
                {
                    do
                    {
                        card = Card.Deal().WithoutID();
                    } while (delt.Contains(card) && delt.Count < 17);
                    hand.Add(card);
                    delt.Add(card);

                    game.PlayerOnTheMove = playerState.User;
                }

                playerState.Cards.AddRange(hand);
                hand.Clear();
            }
            unitOfWork.GameRepository.Update(game);
            await unitOfWork.CompleteAsync();
            game.ClearPasswords();
            return game;
        }
        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[Random.Shared.Next(s.Length)]).ToArray());
        }

        public async Task<Game?> JoinGame(int gameID, int userID)
        {
            // var game = unitOfWork.GameRepository.GetIncludes(g => g.Players).SingleOrDefault(g => g.GameID == gameID);

            var game = unitOfWork.GameRepository.GetGameWithPlayerStatesAndUserData(gameID);

            var whoWantsToJoin = await this.unitOfWork.UserRepository.GetOne(userID);

            if (whoWantsToJoin == null) return null;
            if (game == null) return null;
            PlayerState found = game.Players.Find(state => state.User.UserID == userID);
            if (found != null)
            {
                return null;
            }
            if (game.Players.Count >= 4) return null;

            game.Players.Add(PlayerState.FromUser(whoWantsToJoin));
            unitOfWork.GameRepository.Update(game);

            await this.unitOfWork.CompleteAsync();
            game.ClearPasswords();
            return game;
        }

        public async Task<Game?> RemovePlayer(int gameID, int userID)
        {
            //var game = unitOfWork.GameRepository.GetIncludes(g => g.Players).SingleOrDefault(g => g.GameID == gameID);
            var game = unitOfWork.GameRepository.GetGameWithPlayerStatesAndUserData(gameID);


            if (game == null) return null;
            var player = game.Players.Find(p => p.User.UserID == userID);
            if (player == null) return null;
            unitOfWork.PlayerStateRepository.Delete(player);
            game.Players.Remove(player);
            unitOfWork.GameRepository.Update(game);
            await unitOfWork.CompleteAsync();

            game.ClearPasswords();
            return game;
        }

        public async Task<bool> RemoveGame(int gameID)
        {
            var game = unitOfWork.GameRepository.GetInclude("Players.Cards").SingleOrDefault(g => g.GameID == gameID);
            if (game != null)
            {
                foreach (var player in game.Players)
                {
                    foreach (var card in player.Cards)
                    {
                        unitOfWork.CardRepository.Delete(card);
                    }
                    unitOfWork.PlayerStateRepository.Delete(player);
                }
                unitOfWork.GameRepository.Delete(game);
                await unitOfWork.CompleteAsync();
                return true;
            }
            return false;
        }

        public async Task<Game?> PassACard(int gameID, int playerfromID, int playertoID, int cardID)
        {

            var game = unitOfWork.GameRepository.GetInclude("Players.Cards").SingleOrDefault(g => g.GameID == gameID);




            /*
            var game = unitOfWork.GameRepository.GetInclude("Players.Cards").SingleOrDefault(g => g.Id == gameID);
            if (game == null) return null;
            var playerFrom = await unitOfWork.PlayerStateRepository.GetOne(playerfromID);
            var playerTo = await unitOfWork.PlayerStateRepository.GetOne(playertoID);
            var cardToPass = await unitOfWork.CardRepository.GetOne(cardID);
            if (playerFrom == null && playerTo == null) return null;
            
            playerTo.Cards.Add(cardToPass);
            playerFrom.Cards.Remove(cardToPass);
            unitOfWork.CompleteAsync();
                       */
            return null;
        }
        public IEnumerable<Game> GetAllGamesNotStarted()
        {
            IEnumerable<Game> list = unitOfWork.GameRepository.GetAllGamesNotStarted();//.GetIncludes(g => g.GameOwner, g => g.Players/*, g => g.PlayerOnTheMove*/).Where(g => g.DateOfStart == null).ToList();


            foreach (Game game in list)
            {
                game.GameOwner = game.GameOwner.WithoutPassword();
                game.ClearPasswords();
            }

            return list;
        }
    }
}
