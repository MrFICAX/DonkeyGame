﻿using DonkeyGameAPI.Hubs;
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

        public Task<IEnumerable<Game>> GetAllGamesNotStarted()
        {
            return (Task<IEnumerable<Game>>)unitOfWork.GameRepository.GetIncludes().Where(g => g.DateOfStart == null);         
            
        }

        public async Task<Game?> StartGame(int gameID)
        {
            var game = unitOfWork.GameRepository.GetIncludes(g => g.Players).SingleOrDefault(g => g.Id == gameID);
            if (game == null) return null;
            game.DateOfStart = DateTime.Now;
            int num = Random.Shared.Next(0, 3);
            List<Card> delt = new();
            List<Card> hand = new();
            Card card = new(0,"");
            delt.Add(card);
            foreach( PlayerState player in game.Players)
            {
                player.Cards = new List<Card>();              
                                
                for(int i = 0; i < 4; i++)
                {
                    do
                    {
                        card = Card.Deal().WithoutID();
                    } while (delt.Contains(card) && delt.Count < 17);                     
                    hand.Add(card);
                    delt.Add(card);
                }
                if(game.Players.IndexOf(player) % 4 == num) hand.Add(Card.SpecialCard());
                player.Cards.AddRange(hand);
                hand.Clear();
            }
            unitOfWork.GameRepository.Update(game);
            await unitOfWork.CompleteAsync();
            return game;
        }
        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[Random.Shared.Next(s.Length)]).ToArray());
        }

        public async Task<Game?> CreateGame(int userID)
        {
            var author = await this.unitOfWork.UserRepository.GetOne(userID);
            if(author == null) return null;
            Game game = new();

            game.GameOwnerID = author.UserID;
            game.GameCode = RandomString(15);
            game.IsFinished = false;
            game.Players = new List<PlayerState>
            {
                PlayerState.FromUser(author)
            };
            this.unitOfWork.GameRepository.Add(game);
            await this.unitOfWork.CompleteAsync(); 
            return game;
        }

        public async Task<Game?> JoinGame(int gameID, int userID)
        {
            var game = unitOfWork.GameRepository.GetIncludes(g => g.Players).SingleOrDefault(g => g.Id == gameID);
            
            var whoWantsToJoin = await this.unitOfWork.UserRepository.GetOne(userID);

            if (whoWantsToJoin == null) return null;
            if (game == null) return null;
            if (game.Players.Count > 4) return null;
                
            game.Players.Add(PlayerState.FromUser(whoWantsToJoin));
            unitOfWork.GameRepository.Update(game);               
            
            await this.unitOfWork.CompleteAsync();       
            return game;                                 
        }

        public async Task<Game?> RemovePlayer(int gameID, int userID)
        {
            var game = unitOfWork.GameRepository.GetIncludes(g => g.Players).SingleOrDefault(g => g.Id == gameID);

            if (game == null) return null;
            var player = game.Players.Find(p => p.UserID == userID);
            if(player == null) return null;
            unitOfWork.PlayerStateRepository.Delete(player);                
            game.Players.Remove(player);
            unitOfWork.GameRepository.Update(game);
            await unitOfWork.CompleteAsync();                       
            return game;
        }

        public async Task<bool> RemoveGame(int gameID)
        {
            var game = unitOfWork.GameRepository.GetInclude("Players.Cards").SingleOrDefault(g => g.Id == gameID);
            if (game != null)
            {
                foreach (var player in game.Players)
                {
                    foreach(var card in player.Cards)
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
    }
}
