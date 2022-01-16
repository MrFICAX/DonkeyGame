using DonkeyGameAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DonkeyGameAPI.IServices
{
    public interface IGameService
    {
        Task<IEnumerable<Game>> GetAllGamesNotStarted();
        Task<Game> CreateGame(int userID);
        Task<Game?> JoinGame(int gameID, int userID);
        Task<Game> RemovePlayer(int gameID, int userID);
        Task<bool> RemoveGame(int gameID);
        Task<Game> StartGame(int gameID);
    }
}
