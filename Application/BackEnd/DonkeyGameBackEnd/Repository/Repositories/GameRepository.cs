using DataAccess;
using DataAccess.Models;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class GameRepository : Repository<Game>, IGameRepository
    {
        public GameRepository(DonkeyGameContext context) : base(context)
        {
        }

        public override bool Add(Game entity)
        {
            return base.Add(entity);
        }
        public override bool Delete(Game obj)
        {
            this._context.Set<Game>().Remove(obj);
            return true;
        }

        public override Task<List<Game>> GetAll()
        {
            return base.GetAll();
        }

        public override Task<Game> GetOne(int id)
        {
            return base.GetOne(id);
        }

        public override bool Update(Game entity)
        {
            return base.Update(entity);
        }
    }
}
