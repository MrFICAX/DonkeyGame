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
    public class PlayerStateRepository : Repository<PlayerState>, IPlayerStateRepository
    {
        public PlayerStateRepository(DonkeyGameContext context) : base(context)
        {
        }
        public override bool Add(PlayerState entity)
        {
            return base.Add(entity);
        }
        public override bool Delete(PlayerState obj)
        {
            this._context.Set<PlayerState>().Remove(obj);
            return true;
        }

        public override List<PlayerState> GetAll()
        {
            return base.GetAll();
        }

        public override Task<PlayerState> GetOne(int id)
        {
            return base.GetOne(id);
        }

        public override bool Update(PlayerState entity)
        {
            return base.Update(entity);
        }
    }
}
