using DonkeyGameAPI.Models;
using Microsoft.AspNetCore.SignalR;

namespace DonkeyGameAPI.Hubs
{
    public class GameHub : Hub
    {
        public Task JoinGame(int gameID)
        {
            return Groups.AddToGroupAsync(Context.ConnectionId, "gameID:" + gameID);
        }


    }
}
