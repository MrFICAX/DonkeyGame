using ChatService;
using DonkeyGameAPI.Models;
using Microsoft.AspNetCore.SignalR;

namespace DonkeyGameAPI.Hubs
{
    public class GameHub : Hub
    {
        private readonly string _botUser;
        public readonly IDictionary<string, UserConnection> _connections;

        public GameHub(IDictionary<string, UserConnection> connections)
        {
            _botUser = "MyChat Bot";
            _connections = connections;
        }
        //public Task JoinGame(int gameID)
        //{
        //    return Groups.AddToGroupAsync(Context.ConnectionId, "gameID:" + gameID);
        //}

        //public async Task JoinGroup(UserConnection userConnection)
        //{
        //    await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);

        //    _connections[Context.ConnectionId] = userConnection;

        //    //await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser, $"{userConnection.User} has joined {userConnection.Room} chat");

        //    //await SendUsersConnected(userConnection.Room);
        //}

        //public async Task SendGame(Game updatedGame)
        //{
        //    if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
        //    {
        //        await Clients.Group(userConnection.Room).SendAsync("UpdateGame", userConnection.User, updatedGame);
        //    }
        //}

        //public Task SendUsersConnected(string room)
        //{
        //    var users = _connections.Values
        //        .Where(c => c.Room == room)
        //        .Select(c => c.User);

        //    return Clients.Group(room).SendAsync("UsersInRoom", users);
        //}


    }
}
