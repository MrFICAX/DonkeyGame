using DonkeyGameAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DonkeyGameAPI.IRepositories
{
    public interface IGameRepository : IRepository<Game>
    {
        public Game GetGameWithPlayerStatesAndUserData(int gameID);

        public IEnumerable<Game> GetAllGamesNotStartedOrWithMe(int gameID);
        public IEnumerable<Game> GetAllGamesNotStarted();
        public Game GetGameByGameCode(string gameCode);
        public Game GetGameWithPlayerStatesAndCardsAndUserData(int gameID);
    }
}
