using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using System.Collections.Generic;
using ChatService;
using System.Linq;
using System;
using DonkeyGameAPI.DTOs;

namespace SignalRChat.Hubs
{
    public class GameNChatHub : Hub
    {
        private readonly string _botUser;
        private readonly IDictionary<string, UserConnection> _connections;
        private static readonly IDictionary<string, List<string>> _layedUsers = new Dictionary<string, List<string>>();


        public GameNChatHub(IDictionary<string, UserConnection> connections)
        {
            _botUser = "MyChat Bot";
            _connections = connections;
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                _connections.Remove(Context.ConnectionId);
                Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser, $"{userConnection.User} has left");
                SendUsersConnected(userConnection.Room);
            }

            return base.OnDisconnectedAsync(exception);
        }

        public async Task JoinRoom(UserConnection userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);

            _connections[Context.ConnectionId] = userConnection;

            await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", _botUser, $"{userConnection.User} has joined {userConnection.Room} chat");

            await SendUsersConnected(userConnection.Room);
        }

        public async Task ClearList(string gameCode)
        {
            Console.WriteLine(gameCode);
            if (_layedUsers.ContainsKey(gameCode))
                _layedUsers[gameCode].Clear();
            else
                _layedUsers.Add(gameCode, new List<string>());
            //await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);

            //_connections[Context.ConnectionId] = userConnection;

            await Clients.Group(gameCode).SendAsync("ClearListFinished");

            //await SendUsersConnected(userConnection.Room);
        }

        public async Task LayDownHand(GameCodePlayerState data)
        {
            if (!_layedUsers.ContainsKey(data.Gamecode))
            {
                _layedUsers.Add(data.Gamecode, new List<string>());
            }
            if (_layedUsers[data.Gamecode].Contains(data.Playerstateid))
            {
                //await Clients.Group(data.Gamecode).SendAsync("updateLayedUsers", _layedUsers[data.Gamecode]);
            }
            else
            {
                _layedUsers[data.Gamecode].Add(data.Playerstateid);
                //if (_layedUsers[data.Gamecode].Count == 4)
                //{
                //    await Clients.Group(data.Gamecode).SendAsync("Loser found", data);
                //}
                //else
                //{
                await Clients.Group(data.Gamecode).SendAsync("updateLayedUsers", _layedUsers[data.Gamecode]);
                //}
            }

        }

        public async Task GetLayDownHands(GameCodePlayerState data)
        {
            if (_layedUsers.ContainsKey(data.Gamecode))
            {
                //if (_layedUsers[data.Gamecode].Count == 4)
                //{
                //    await Clients.Group(data.Gamecode).SendAsync("Loser found", data);
                //}
                //else
                //{
                await Clients.Group(data.Gamecode).SendAsync("updateLayedUsers", _layedUsers[data.Gamecode]);
                //}
            }

        }

        public async Task CreateSingleGroup(string playerStateID)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, playerStateID);

            await Clients.Group(playerStateID.ToString()).SendAsync("GroupCreated", playerStateID, "Group for this user is created!");
            //await Clients.All.SendAsync("ReceiveMessage", _botUser, "Testing");

        }

        public async Task SendMessage(string message)
        {
            if (_connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", userConnection.User, message);
            }
        }

        public Task SendUsersConnected(string room)
        {
            var users = _connections.Values
                .Where(c => c.Room == room)
                .Select(c => c.User);

            return Clients.Group(room).SendAsync("UsersInRoom", users);
        }
    }
}
