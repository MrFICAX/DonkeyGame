using DonkeyGameAPI.IRepositories;
using DonkeyGameAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DonkeyGameAPI.Repositories
{
    public class GameRepository : Repository<Game>, IGameRepository
    {
        public GameRepository(DonkeyGameContext context) : base(context)
        {
        }

        public override Task<bool> Add(Game entity)
        {
            return base.Add(entity);
        }
        public override bool Delete(Game obj)
        {
            _context.Set<Game>().Remove(obj);
            return true;
        }

        public override IEnumerable<Game> GetAll()
        {
            return base.GetAll();
        }

        public IEnumerable<Game> GetAllGamesNotStarted()
        {
            return _context.Games.Include(g => g.GameOwner).Include(g => g.Players).ThenInclude(state => state.User).Where(game => game.DateOfStart == null).ToList();

        }

        public Game GetGameWithPlayerStatesAndUserData(int gameID)
        {
            return _context.Games.Include(g => g.GameOwner).Include(g => g.Players).ThenInclude(state => state.User).Where(game => game.GameID == gameID).SingleOrDefault();
        }

        public override Task<Game?> GetOne(int id)
        {
            return base.GetOne(id);          
        }

        public override bool Update(Game entity)
        {
            return base.Update(entity);
        }
    }
}
