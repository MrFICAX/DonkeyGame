using DonkeyGameAPI.DTOs;
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
        IEnumerable<Game> GetAllGamesNotStarted();

        IEnumerable<Game> GetAllGamesNotStartedOrWithMe(int userID);
        Task<Game?> CreateGame(int userID, string gameID);
        Task<Game?> JoinGame(int gameID, int userID);
        Task<Game?> RemovePlayer(int gameID, int userID);
        Task<bool> RemoveGame(int gameID);
        Task<Game?> StartGame(int gameID);
        Task<Game?> GivePointsAndRefreshGame(int gameID, int userLoserID);

        Task<Game> PassACard(int gameID, int playerfromID, int cardID);

        Task<Game> SetLoserPlayer(int gameID, int userID);

        Task<MyCards?> GetMyCards(int gameID, int userID);
    }
}
