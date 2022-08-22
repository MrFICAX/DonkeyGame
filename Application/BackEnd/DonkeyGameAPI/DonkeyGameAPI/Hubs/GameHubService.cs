using ChatService;
using DonkeyGameAPI.Models;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DonkeyGameAPI.Hubs
{
    public class GameHubService
    {
        private readonly IHubContext<GameHub> _gameHub;

        public GameHubService(IHubContext<GameHub> gameHub)
        {
            _gameHub = gameHub;
        }


        //TEMPLATE PRIMERI IZ DRUGIH PROJEKATA

        public async Task<string> NotifyOnGameChanges(int gameID, string method, Object object_to_send)
        {
            await _gameHub.Clients.Group("Game" + gameID).SendAsync(method, object_to_send);
            return "Game changed";
        }

        public async void sendGame(Game updatedGame)
        {

            await _gameHub.Clients.Group(updatedGame.GameCode).SendAsync("UpdateGame",  updatedGame);

        }

        public async Task<string> NotifyOnWaitingLobbyChanges(int lobbyID, string method, Object object_to_send)
        {
            await _gameHub.Clients.Group("Waiting Lobby" + lobbyID).SendAsync(method, object_to_send);
            return "Waiting Lobby changed";
        }
    }
}
